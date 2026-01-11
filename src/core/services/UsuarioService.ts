import { Usuario, UsuarioCadastroDTO, UsuarioLoginDTO } from '../domain/entities/Usuario';
import { UsuarioRepository } from '../repositories/UsuarioRepository';

export class UsuarioService {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async cadastrar(usuarioDTO: UsuarioCadastroDTO): Promise<Usuario> {
        if (usuarioDTO.senha !== usuarioDTO.confirmacaoSenha) {
            throw new Error('As senhas não coincidem');
        }

        if (usuarioDTO.senha.length < 6) {
            throw new Error('A senha deve ter pelo menos 6 caracteres');
        }

        if (!this.validarEmail(usuarioDTO.email)) {
            throw new Error('Email inválido');
        }

        const usuarioExistente = await this.usuarioRepository.buscarPorEmail(usuarioDTO.email);
        if (usuarioExistente) {
            throw new Error('Este email já está cadastrado');
        }

        return await this.usuarioRepository.criar(usuarioDTO);
    }

    async login(loginDTO: UsuarioLoginDTO): Promise<Usuario> {
        const usuario = await this.usuarioRepository.autenticar(loginDTO.email, loginDTO.senha);
        
        if (!usuario) {
            throw new Error('Email ou senha incorretos');
        }

        return usuario;
    }

    async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
        return await this.usuarioRepository.buscarPorId(id);
    }

    async buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
        return await this.usuarioRepository.buscarPorEmail(email);
    }

    async listarUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.listarTodos();
    }

    async atualizarUsuario(id: string, dadosAtualizacao: Partial<Usuario>): Promise<Usuario> {
        if (dadosAtualizacao.email) {
            const usuarioComEmail = await this.usuarioRepository.buscarPorEmail(dadosAtualizacao.email);
            if (usuarioComEmail && usuarioComEmail.id !== id) {
                throw new Error('Este email já está em uso por outro usuário');
            }
        }

        return await this.usuarioRepository.atualizar(id, dadosAtualizacao);
    }

    async excluirUsuario(id: string): Promise<void> {
        await this.usuarioRepository.excluir(id);
    }

    private validarEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validarForcaSenha(senha: string): { valida: boolean; mensagem?: string } {
        if (senha.length < 6) {
            return { valida: false, mensagem: 'A senha deve ter pelo menos 6 caracteres' };
        }

        if (!/[A-Z]/.test(senha)) {
            return { valida: false, mensagem: 'A senha deve conter pelo menos uma letra maiúscula' };
        }

        if (!/[0-9]/.test(senha)) {
            return { valida: false, mensagem: 'A senha deve conter pelo menos um número' };
        }

        return { valida: true };
    }
}