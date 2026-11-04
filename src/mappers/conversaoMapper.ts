import type { Conversao, ConversaoApi, ConversaoPayload, Id, NovaConversao } from "../types";

export function toConversao(dto: ConversaoApi): Conversao {
  return {
    id: Number(dto.id),
    recompensaId: Number(dto.recompensaId),
    recompensaNome: dto.recompensaNome,
    quantidade: Number(dto.quantidade),
    pontosGastos: Number(dto.pontosGastos),
    status: dto.status,
    criadaEm: new Date(dto.criadaEm),
  };
}

export function toConversaoPayload(conversao: NovaConversao, usuarioId: Id): ConversaoPayload {
  return {
    usuarioId,
    recompensaId: Number(conversao.recompensaId),
    quantidade: Number(conversao.quantidade),
  };
}
