import { Usuario, UsuarioCadastroDTO } from '../domain/entities/Usuario';
import { UsuarioRepository } from './UsuarioRepository';

export class LocalStorageUsuarioRepository implements UsuarioRepository {
    private readonly STORAGE_KEY = 'sistema_estudos_usuarios';

    private getUsuariosFromStorage(): Usuario[] {
        if (typeof window === 'undefined') return [];
        
        const usuariosJSON = localStorage.getItem(this.STORAGE_KEY);
        if (!usuariosJSON) return [];
        try {
            const parsed: any[] = JSON.parse(usuariosJSON);
            return parsed.map(u => ({ ...u, dataCriacao: new Date(u.dataCriacao) }));
        } catch {
            return [];
        }
    }

    private saveUsuariosToStorage(usuarios: Usuario[]): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
    }

    async criar(usuarioDTO: UsuarioCadastroDTO): Promise<Usuario> {
        const usuarios = this.getUsuariosFromStorage();
        
        const novoUsuario: Usuario = {
            id: this.gerarId(),
            nome: usuarioDTO.nome,
            email: usuarioDTO.email,
            senha: usuarioDTO.senha, // Em produção, usar hash (bcrypt)
            dataCriacao: new Date()
        };

        usuarios.push(novoUsuario);
        this.saveUsuariosToStorage(usuarios);

        return novoUsuario;
    }

    async buscarPorId(id: string): Promise<Usuario | null> {
        const usuarios = this.getUsuariosFromStorage();
        return usuarios.find(u => u.id === id) || null;
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        const usuarios = this.getUsuariosFromStorage();
        return usuarios.find(u => u.email === email) || null;
    }

    async autenticar(email: string, senha: string): Promise<Usuario | null> {
        const usuarios = this.getUsuariosFromStorage();
        const usuario = usuarios.find(u => u.email === email && u.senha === senha);
        return usuario || null;
    }

    async listarTodos(): Promise<Usuario[]> {
        return this.getUsuariosFromStorage();
    }

    async atualizar(id: string, usuarioAtualizado: Partial<Usuario>): Promise<Usuario> {
        const usuarios = this.getUsuariosFromStorage();
        const index = usuarios.findIndex(u => u.id === id);
        
        if (index === -1) {
            throw new Error('Usuário não encontrado');
        }

        usuarios[index] = { ...usuarios[index], ...usuarioAtualizado };
        this.saveUsuariosToStorage(usuarios);

        return usuarios[index];
    }

    async excluir(id: string): Promise<void> {
        const usuarios = this.getUsuariosFromStorage();
        const usuariosFiltrados = usuarios.filter(u => u.id !== id);
        
        if (usuarios.length === usuariosFiltrados.length) {
            throw new Error('Usuário não encontrado');
        }

        this.saveUsuariosToStorage(usuariosFiltrados);
    }

    private gerarId(): string {
        return Date.now().toString() + Math.random().toString(36).slice(2, 11);
    }
}