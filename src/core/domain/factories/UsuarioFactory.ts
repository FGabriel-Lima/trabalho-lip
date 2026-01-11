import { UsuarioService } from '../../services/UsuarioService';
import { LocalStorageUsuarioRepository } from '../../repositories/LocalStorageUsuarioRepository';

export class UsuarioFactory {
    static criarUsuarioService(): UsuarioService {
        const usuarioRepository = new LocalStorageUsuarioRepository();
        return new UsuarioService(usuarioRepository);
    }
}