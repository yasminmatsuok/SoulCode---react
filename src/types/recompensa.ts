import type { Id } from "./common";

export type CategoriaRecompensa = "energia" | "transporte" | "alimentacao" | "cultura" | "parceiros";

export interface NovaRecompensa {
  nome: string;
  descricao: string;
  icone: string;
  categoria: CategoriaRecompensa;
  custoPontos: number;
  estoque: number;
  ativa: boolean;
}

// Intersection Type: recompensa salva = dados do formulário + campos gerados pela API
export type Recompensa = NovaRecompensa & {
  id: Id;
  criadaEm: Date;
};

// Atualização parcial (PATCH), ex.: ativar/desativar
export type AtualizacaoRecompensa = Partial<NovaRecompensa>;
