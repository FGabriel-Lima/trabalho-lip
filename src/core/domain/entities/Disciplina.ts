export interface Disciplina {
    id: string;
    nome: string;
    descricao?: string;
    cor?: string; 
    usuarioId: string; 
    dataCriacao: Date;
}

export interface DisciplinaDTO {
    nome: string;
    descricao?: string;
    cor?: string;
}