import { Usuario, UsuarioCadastroDTO } from '../domain/entities/Usuario';

export interface UsuarioRepository {
    criar(usuarioDTO: UsuarioCadastroDTO): Promise<Usuario>;
    buscarPorId(id: string): Promise<Usuario | null>;
    buscarPorEmail(email: string): Promise<Usuario | null>;
    autenticar(email: string, senha: string): Promise<Usuario | null>;
    listarTodos(): Promise<Usuario[]>;
    atualizar(id: string, usuario: Partial<Usuario>): Promise<Usuario>;
    excluir(id: string): Promise<void>;
}