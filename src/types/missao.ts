import type { Id } from "./common";

export type Dificuldade = "facil" | "medio" | "dificil";

// Dados que o usuário preenche no formulário (sem id)
export interface NovaMissao {
  icone: string;
  titulo: string;
  descricao: string;
  descricaoLonga: string;
  pontos: number;
  dificuldade: Dificuldade;
}

// Intersection Type: a missão salva é a nova missão + o id gerado pela API
export type Missao = NovaMissao & { id: Id };
