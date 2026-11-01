import type { CategoriaRecompensa, Dificuldade, Interesse, StatusConversao } from "../types";

// Textos e cores de cada valor dos union types (Record garante que nenhum valor fique de fora)
export const DIFICULDADE_LABEL: Record<Dificuldade, string> = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
};

export const DIFICULDADE_COR: Record<Dificuldade, string> = {
  facil: "bg-green-400/20 text-green-300",
  medio: "bg-amber-400/20 text-amber-300",
  dificil: "bg-red-400/20 text-red-300",
};

export const CATEGORIA_LABEL: Record<CategoriaRecompensa, string> = {
  energia: "Energia",
  transporte: "Transporte",
  alimentacao: "Alimentação",
  cultura: "Cultura",
  parceiros: "Parceiros",
};

export const STATUS_CONVERSAO_LABEL: Record<StatusConversao, string> = {
  pendente: "Pendente",
  aprovada: "Aprovada",
  cancelada: "Cancelada",
};

export const STATUS_CONVERSAO_COR: Record<StatusConversao, string> = {
  pendente: "bg-amber-400/20 text-amber-300",
  aprovada: "bg-green-400/20 text-green-300",
  cancelada: "bg-red-400/20 text-red-300",
};

export const ICONES_MISSAO = ["🌍", "🚌", "♻️", "💡", "🌱", "🚲", "☀️", "💧", "🛍️", "🥕"];
export const ICONES_RECOMPENSA = ["🎁", "💡", "🚌", "🥗", "🎬", "🚲", "🌳", "☀️", "☕", "🎟️"];
export const INTERESSES: Interesse[] = ["Reciclagem", "Energia", "Transporte", "Alimentação", "Água"];
