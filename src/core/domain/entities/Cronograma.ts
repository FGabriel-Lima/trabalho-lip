import { DiaSemana } from './DiaSemana';
import { Disciplina } from './Disciplina';

export interface DiaCronograma {
    dia: DiaSemana;
    disciplinasIds: string[];
    ordem: number; 
}

export interface Cronograma {
    id: string;
    usuarioId: string;
    nome?: string;
    dias: DiaCronograma[];
    dataCriacao: Date;
    dataAtualizacao: Date;
}

export interface DisciplinaDiaDTO {
    disciplinaId: string;
    dia: DiaSemana;
    ordem?: number;
}

export interface CronogramaDTO {
    nome?: string;
    dias?: Omit<DiaCronograma, 'ordem'>[]; 
}