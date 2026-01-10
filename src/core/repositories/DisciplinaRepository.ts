import { Disciplina, DisciplinaDTO } from '../domain/entities/Disciplina';

export interface DisciplinaRepository {
    criar(usuarioId: string, disciplinaDTO: DisciplinaDTO): Promise<Disciplina>;
    buscarPorId(id: string): Promise<Disciplina | null>;
    buscarPorUsuarioId(usuarioId: string): Promise<Disciplina[]>;
    buscarPorIds(ids: string[]): Promise<Disciplina[]>;
    atualizar(id: string, disciplinaDTO: Partial<DisciplinaDTO>): Promise<Disciplina>;
    excluir(id: string): Promise<void>;
    buscarPorNomeEUsuario(usuarioId: string, nome: string): Promise<Disciplina | null>;
}