import type { Id } from "./common";

export type StatusConversao = "pendente" | "aprovada" | "cancelada";

// Pedido de conversão de pontos em uma recompensa
export interface NovaConversao {
  recompensaId: Id;
  quantidade: number;
}

export type Conversao = NovaConversao & {
  id: Id;
  recompensaNome: string;
  pontosGastos: number;
  status: StatusConversao;
  criadaEm: Date;
};
