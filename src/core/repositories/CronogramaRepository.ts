import { Cronograma, CronogramaDTO } from '../domain/entities/Cronograma';

export interface CronogramaRepository {
    criar(usuarioId: string, cronogramaDTO: CronogramaDTO): Promise<Cronograma>;
    buscarPorId(id: string): Promise<Cronograma | null>;
    buscarPorUsuarioId(usuarioId: string): Promise<Cronograma | null>;
    atualizar(id: string, cronogramaDTO: Partial<CronogramaDTO>): Promise<Cronograma>;
    excluir(id: string): Promise<void>;
    adicionarDisciplinaAoDia(cronogramaId: string, dia: string, disciplinaId: string): Promise<Cronograma>;
    removerDisciplinaDoDia(cronogramaId: string, dia: string, disciplinaId: string): Promise<Cronograma>;
    reordenarDisciplinasNoDia(cronogramaId: string, dia: string, disciplinasIds: string[]): Promise<Cronograma>;
}