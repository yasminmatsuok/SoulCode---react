import type { Nivel, NomeNivel, Saldo, SaldoApi } from "../types";

// O nível é calculado no front a partir dos pontos acumulados
const NIVEIS: { minimo: number; nome: NomeNivel }[] = [
  { minimo: 0, nome: "Iniciante" },
  { minimo: 250, nome: "Explorador" },
  { minimo: 750, nome: "Guardião" },
  { minimo: 1500, nome: "Lenda Verde" },
];

export function calcularNivel(pontosAcumulados: number): Nivel {
  const indice = NIVEIS.findLastIndex((nivel) => pontosAcumulados >= nivel.minimo);
  const proximo = NIVEIS[indice + 1];
  return {
    numero: indice + 1,
    nome: NIVEIS[indice].nome,
    faltamParaProximo: proximo ? proximo.minimo - pontosAcumulados : null,
  };
}

export function toSaldo(dto: SaldoApi): Saldo {
  const pontosAcumulados = Number(dto.pontosAcumulados);
  return {
    pontosDisponiveis: Number(dto.pontosDisponiveis),
    pontosAcumulados,
    pontosConvertidos: Number(dto.pontosConvertidos),
    nivel: calcularNivel(pontosAcumulados),
  };
}
