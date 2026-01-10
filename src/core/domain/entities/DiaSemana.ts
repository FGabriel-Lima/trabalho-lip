export enum DiaSemana {
    DOMINGO = 'DOMINGO',
    SEGUNDA = 'SEGUNDA',
    TERCA = 'TERCA',
    QUARTA = 'QUARTA',
    QUINTA = 'QUINTA',
    SEXTA = 'SEXTA',
    SABADO = 'SABADO'
}

export const DiasDaSemana = [
    DiaSemana.DOMINGO,
    DiaSemana.SEGUNDA,
    DiaSemana.TERCA,
    DiaSemana.QUARTA,
    DiaSemana.QUINTA,
    DiaSemana.SEXTA,
    DiaSemana.SABADO
] as const;

export function getDiaSemanaPorIndice(index: number): DiaSemana {
    return DiasDaSemana[index];
}

export function getIndiceDiaSemana(dia: DiaSemana): number {
    return DiasDaSemana.indexOf(dia);
}