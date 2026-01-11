export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    dataCriacao: Date;
}

export interface UsuarioCadastroDTO {
    nome: string;
    email: string;
    senha: string;
    confirmacaoSenha: string;
}

export interface UsuarioLoginDTO {
    email: string;
    senha: string;
}