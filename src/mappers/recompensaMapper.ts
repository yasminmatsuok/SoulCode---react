import type {
  AtualizacaoRecompensa,
  NovaRecompensa,
  Recompensa,
  RecompensaApi,
  RecompensaPayload,
} from "../types";

export function toRecompensa(dto: RecompensaApi): Recompensa {
  return {
    id: Number(dto.id),
    nome: dto.nome,
    descricao: dto.descricao,
    icone: dto.icone || "🎁",
    categoria: dto.categoria,
    custoPontos: Number(dto.custoPontos),
    estoque: Number(dto.estoque),
    ativa: Boolean(dto.ativa),
    criadaEm: new Date(dto.criadaEm),
  };
}

export function toRecompensaPayload(recompensa: NovaRecompensa): RecompensaPayload {
  return {
    nome: recompensa.nome.trim(),
    descricao: recompensa.descricao.trim(),
    icone: recompensa.icone,
    categoria: recompensa.categoria,
    custoPontos: Number(recompensa.custoPontos),
    estoque: Number(recompensa.estoque),
    ativa: recompensa.ativa,
  };
}

// No PATCH enviamos somente os campos alterados
export function toRecompensaPatch(alteracoes: AtualizacaoRecompensa): Partial<RecompensaPayload> {
  return { ...alteracoes };
}
