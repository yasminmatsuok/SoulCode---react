export type NomeNivel = "Iniciante" | "Explorador" | "Guardião" | "Lenda Verde";

export interface Nivel {
  numero: number;
  nome: NomeNivel;
  // pontos acumulados que faltam para o próximo nível (null no nível máximo)
  faltamParaProximo: number | null;
}

export interface Saldo {
  pontosDisponiveis: number;
  pontosAcumulados: number;
  pontosConvertidos: number;
  nivel: Nivel;
}
