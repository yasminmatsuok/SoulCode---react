import type { Id } from "./common";

// Union Type: áreas de interesse oferecidas no cadastro
export type Interesse = "Reciclagem" | "Energia" | "Transporte" | "Alimentação" | "Água";

// Dados do formulário de cadastro/edição (a API exige a senha nos dois casos)
export interface NovoUsuario {
  nome: string;
  email: string;
  senha: string;
  idade: number;
  cidade: string;
  interesse: string;
}

// Intersection Type: usuário salvo = dados do formulário (sem a senha) + campos gerados pela API
export type Usuario = Omit<NovoUsuario, "senha"> & {
  id: Id;
  pontos: number;
};

export interface Avatar {
  id: Id;
  nome: string;
  nivel: number;
  usuarioId: Id | null;
  usuarioNome: string | null;
}
