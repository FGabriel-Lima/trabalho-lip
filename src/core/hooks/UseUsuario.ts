import { useState, useMemo } from 'react';
import { Usuario, UsuarioCadastroDTO, UsuarioLoginDTO } from '../domain/entities/Usuario';
import { UsuarioFactory } from '../domain/factories/UsuarioFactory';

export function useUsuario() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const usuarioService = useMemo(() => UsuarioFactory.criarUsuarioService(), []);

    const cadastrar = async (dados: UsuarioCadastroDTO): Promise<Usuario> => {
        setCarregando(true);
        setErro(null);

        try {
            const novoUsuario = await usuarioService.cadastrar(dados);
            setUsuario(novoUsuario);
            return novoUsuario;
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error);
            setErro(msg);
            throw error;
        } finally {
            setCarregando(false);
        }
    };

    const login = async (dados: UsuarioLoginDTO): Promise<Usuario> => {
        setCarregando(true);
        setErro(null);

        try {
            const usuarioLogado = await usuarioService.login(dados);
            setUsuario(usuarioLogado);
            return usuarioLogado;
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error);
            setErro(msg);
            throw error;
        } finally {
            setCarregando(false);
        }
    };

    const logout = () => {
        setUsuario(null);
        setErro(null);
    };

    const buscarUsuarioPorId = async (id: string): Promise<Usuario | null> => {
        setCarregando(true);
        setErro(null);
        try {
            return await usuarioService.buscarUsuarioPorId(id);
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error);
            setErro(msg);
            throw error;
        } finally {
            setCarregando(false);
        }
    };

    const atualizarUsuario = async (id: string, dados: Partial<Usuario>): Promise<Usuario> => {
        setCarregando(true);
        setErro(null);

        try {
            const usuarioAtualizado = await usuarioService.atualizarUsuario(id, dados);
            if (usuario && usuario.id === id) {
                setUsuario(usuarioAtualizado);
            }
            return usuarioAtualizado;
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error);
            setErro(msg);
            throw error;
        } finally {
            setCarregando(false);
        }
    };

    const excluirUsuario = async (id: string): Promise<void> => {
        setCarregando(true);
        setErro(null);

        try {
            await usuarioService.excluirUsuario(id);
            if (usuario && usuario.id === id) {
                logout();
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : String(error);
            setErro(msg);
            throw error;
        } finally {
            setCarregando(false);
        }
    };

    const validarForcaSenha = (senha: string) => {
        return usuarioService.validarForcaSenha(senha);
    };

    return {
        usuario,
        carregando,
        erro,
        cadastrar,
        login,
        logout,
        buscarUsuarioPorId,
        atualizarUsuario,
        excluirUsuario,
        validarForcaSenha
    };
}