import { Cronograma, CronogramaDTO, DisciplinaDiaDTO } from '../domain/entities/Cronograma';
import { Disciplina, DisciplinaDTO } from '../domain/entities/Disciplina';
import { DiaSemana, DiasDaSemana } from '../domain/entities/DiaSemana';
import { CronogramaRepository } from '../repositories/CronogramaRepository';
import { DisciplinaRepository } from '../repositories/DisciplinaRepository';

export class CronogramaService {
    constructor(
        private readonly cronogramaRepository: CronogramaRepository,
        private readonly disciplinaRepository: DisciplinaRepository
    ) {}

    async criarCronograma(usuarioId: string, cronogramaDTO?: CronogramaDTO): Promise<Cronograma> {
        const dto = cronogramaDTO || {
            dias: DiasDaSemana.map(dia => ({
                dia,
                disciplinasIds: []
            }))
        };

        const diasCompletos = this.completarDiasFaltantes(dto.dias || []);

        return await this.cronogramaRepository.criar(usuarioId, {
            ...dto,
            dias: diasCompletos
        });
    }

    async buscarCronogramaDoUsuario(usuarioId: string): Promise<Cronograma> {
        let cronograma = await this.cronogramaRepository.buscarPorUsuarioId(usuarioId);
        
        if (!cronograma) {
            cronograma = await this.criarCronograma(usuarioId);
        }

        return cronograma;
    }

    async criarDisciplina(usuarioId: string, disciplinaDTO: DisciplinaDTO): Promise<Disciplina> {
        const disciplinaExistente = await this.disciplinaRepository.buscarPorNomeEUsuario(
            usuarioId, 
            disciplinaDTO.nome
        );

        if (disciplinaExistente) {
            throw new Error(`Já existe uma disciplina com o nome "${disciplinaDTO.nome}"`);
        }

        return await this.disciplinaRepository.criar(usuarioId, disciplinaDTO);
    }

    async associarDisciplinaAoDia(
        usuarioId: string, 
        disciplinaDiaDTO: DisciplinaDiaDTO
    ): Promise<Cronograma> {
        const cronograma = await this.buscarCronogramaDoUsuario(usuarioId);
        
        const disciplina = await this.disciplinaRepository.buscarPorId(disciplinaDiaDTO.disciplinaId);
        
        if (!disciplina) {
            throw new Error('Disciplina não encontrada');
        }

        if (disciplina.usuarioId !== usuarioId) {
            throw new Error('Disciplina não pertence ao usuário');
        }

        const diaCronograma = cronograma.dias.find(d => d.dia === disciplinaDiaDTO.dia);
        
        if (diaCronograma && diaCronograma.disciplinasIds.includes(disciplinaDiaDTO.disciplinaId)) {
            throw new Error('Disciplina já está associada a este dia');
        }

        return await this.cronogramaRepository.adicionarDisciplinaAoDia(
            cronograma.id,
            disciplinaDiaDTO.dia,
            disciplinaDiaDTO.disciplinaId
        );
    }

    async removerDisciplinaDoDia(
        usuarioId: string,
        dia: DiaSemana,
        disciplinaId: string
    ): Promise<Cronograma> {
        const cronograma = await this.buscarCronogramaDoUsuario(usuarioId);
        
        const diaCronograma = cronograma.dias.find(d => d.dia === dia);
        
        if (!diaCronograma || !diaCronograma.disciplinasIds.includes(disciplinaId)) {
            throw new Error('Disciplina não está associada a este dia');
        }

        return await this.cronogramaRepository.removerDisciplinaDoDia(
            cronograma.id,
            dia,
            disciplinaId
        );
    }

    async reordenarDisciplinasNoDia(
        usuarioId: string,
        dia: DiaSemana,
        disciplinasIds: string[]
    ): Promise<Cronograma> {
        const cronograma = await this.buscarCronogramaDoUsuario(usuarioId);
        
        for (const disciplinaId of disciplinasIds) {
            const disciplina = await this.disciplinaRepository.buscarPorId(disciplinaId);
            
            if (!disciplina) {
                throw new Error(`Disciplina com ID ${disciplinaId} não encontrada`);
            }
            
            if (disciplina.usuarioId !== usuarioId) {
                throw new Error(`Disciplina com ID ${disciplinaId} não pertence ao usuário`);
            }
        }

        return await this.cronogramaRepository.reordenarDisciplinasNoDia(
            cronograma.id,
            dia,
            disciplinasIds
        );
    }

    async listarDisciplinasDoUsuario(usuarioId: string): Promise<Disciplina[]> {
        return await this.disciplinaRepository.buscarPorUsuarioId(usuarioId);
    }

    async buscarDisciplinasDoDia(usuarioId: string, dia: DiaSemana): Promise<Disciplina[]> {
        const cronograma = await this.buscarCronogramaDoUsuario(usuarioId);
        const diaCronograma = cronograma.dias.find(d => d.dia === dia);
        
        if (!diaCronograma || diaCronograma.disciplinasIds.length === 0) {
            return [];
        }

        return await this.disciplinaRepository.buscarPorIds(diaCronograma.disciplinasIds);
    }

    async obterCronogramaCompleto(usuarioId: string): Promise<{
        cronograma: Cronograma;
        disciplinasPorDia: Record<DiaSemana, Disciplina[]>;
    }> {
        const cronograma = await this.buscarCronogramaDoUsuario(usuarioId);
        const disciplinasPorDia: Record<DiaSemana, Disciplina[]> = {} as Record<DiaSemana, Disciplina[]>;

        for (const diaCronograma of cronograma.dias) {
            if (diaCronograma.disciplinasIds.length > 0) {
                const disciplinas = await this.disciplinaRepository.buscarPorIds(diaCronograma.disciplinasIds);
                disciplinas.sort((a, b) => {
                    const indexA = diaCronograma.disciplinasIds.indexOf(a.id);
                    const indexB = diaCronograma.disciplinasIds.indexOf(b.id);
                    return indexA - indexB;
                });
                disciplinasPorDia[diaCronograma.dia] = disciplinas;
            } else {
                disciplinasPorDia[diaCronograma.dia] = [];
            }
        }

        return { cronograma, disciplinasPorDia };
    }

    async atualizarDisciplina(
        usuarioId: string,
        disciplinaId: string,
        disciplinaDTO: Partial<DisciplinaDTO>
    ): Promise<Disciplina> {
        const disciplina = await this.disciplinaRepository.buscarPorId(disciplinaId);
        
        if (!disciplina) {
            throw new Error('Disciplina não encontrada');
        }

        if (disciplina.usuarioId !== usuarioId) {
            throw new Error('Disciplina não pertence ao usuário');
        }

        if (disciplinaDTO.nome && disciplinaDTO.nome !== disciplina.nome) {
            const disciplinaComMesmoNome = await this.disciplinaRepository.buscarPorNomeEUsuario(
                usuarioId,
                disciplinaDTO.nome
            );

            if (disciplinaComMesmoNome && disciplinaComMesmoNome.id !== disciplinaId) {
                throw new Error(`Já existe uma disciplina com o nome "${disciplinaDTO.nome}"`);
            }
        }

        return await this.disciplinaRepository.atualizar(disciplinaId, disciplinaDTO);
    }

    async excluirDisciplina(usuarioId: string, disciplinaId: string): Promise<void> {
        const disciplina = await this.disciplinaRepository.buscarPorId(disciplinaId);
        
        if (!disciplina) {
            throw new Error('Disciplina não encontrada');
        }

        if (disciplina.usuarioId !== usuarioId) {
            throw new Error('Disciplina não pertence ao usuário');
        }

        const cronograma = await this.buscarCronogramaDoUsuario(usuarioId);
        
        for (const diaCronograma of cronograma.dias) {
            if (diaCronograma.disciplinasIds.includes(disciplinaId)) {
                await this.cronogramaRepository.removerDisciplinaDoDia(
                    cronograma.id,
                    diaCronograma.dia,
                    disciplinaId
                );
            }
        }

        await this.disciplinaRepository.excluir(disciplinaId);
    }

    private completarDiasFaltantes(dias: { dia: DiaSemana; disciplinasIds: string[] }[]): 
        { dia: DiaSemana; disciplinasIds: string[] }[] {
        
        const diasExistentes = new Set(dias.map(d => d.dia));
        const diasCompletos = [...dias];

        for (const dia of DiasDaSemana) {
            if (!diasExistentes.has(dia)) {
                diasCompletos.push({
                    dia,
                    disciplinasIds: []
                });
            }
        }

        return diasCompletos.sort((a, b) => {
            const indexA = DiasDaSemana.indexOf(a.dia);
            const indexB = DiasDaSemana.indexOf(b.dia);
            return indexA - indexB;
        });
    }

    async copiarCronogramaDaSemanaAnterior(usuarioId: string): Promise<Cronograma> {
        const cronogramaAtual = await this.buscarCronogramaDoUsuario(usuarioId);
        
        const novoCronogramaDTO: CronogramaDTO = {
            dias: cronogramaAtual.dias.map(dia => ({
                dia: dia.dia,
                disciplinasIds: [...dia.disciplinasIds] 
            }))
        };

        return await this.cronogramaRepository.atualizar(
            cronogramaAtual.id,
            novoCronogramaDTO
        );
    }

    async limparCronograma(usuarioId: string): Promise<Cronograma> {
        const cronograma = await this.buscarCronogramaDoUsuario(usuarioId);
        
        const cronogramaDTO: CronogramaDTO = {
            dias: DiasDaSemana.map(dia => ({
                dia,
                disciplinasIds: []
            }))
        };

        return await this.cronogramaRepository.atualizar(
            cronograma.id,
            cronogramaDTO
        );
    }
}