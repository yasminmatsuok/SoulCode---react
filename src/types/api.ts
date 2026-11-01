// Formato EXATO do JSON trocado com a API Java (ver docs/CONTRATO_API.md).
// Se o back-end usar outros nomes de campos, ajuste aqui e nos mappers.
import type { Id } from "./common";
import type { Dificuldade } from "./missao";
import type { CategoriaRecompensa } from "./recompensa";
import type { StatusConversao } from "./conversao";

export interface MissaoApi {
  id: Id;
  icone: string;
  titulo: string;
  descricao: string;
  descricaoLonga: string;
  pontos: number;
  dificuldade: Dificuldade;
}

export type MissaoPayload = Omit<MissaoApi, "id">;

export interface RecompensaApi {
  id: Id;
  nome: string;
  descricao: string;
  icone: string;
  categoria: CategoriaRecompensa;
  custoPontos: number;
  estoque: number;
  ativa: boolean;
  criadaEm: string; // ISO 8601
}

export type RecompensaPayload = Omit<RecompensaApi, "id" | "criadaEm">;

export interface ConversaoApi {
  id: Id;
  usuarioId: Id;
  recompensaId: Id;
  recompensaNome: string;
  quantidade: number;
  pontosGastos: number;
  status: StatusConversao;
  criadaEm: string; // ISO 8601
}

export interface ConversaoPayload {
  usuarioId: Id;
  recompensaId: Id;
  quantidade: number;
}

export interface StatusConversaoPayload {
  status: StatusConversao;
}

export interface SaldoApi {
  usuarioId: Id;
  pontosDisponiveis: number;
  pontosAcumulados: number;
  pontosConvertidos: number;
}

export interface ConclusaoMissaoPayload {
  usuarioId: Id;
}

// ---- Rotas já publicadas na API Java (Spring Boot): /api/usuarios e /api/avatares ----

export interface UsuarioApi {
  id: Id;
  nome: string;
  email: string;
  senhaHash?: string; // a API devolve, mas o front nunca exibe
  idade: number;
  cidade: string;
  interesse: string;
  pontos: number;
}

// No POST e no PUT a API espera "senha" (ela mesma gera o hash)
export type UsuarioPayload = Omit<UsuarioApi, "id" | "senhaHash" | "pontos"> & { senha: string };

export interface AvatarApi {
  id: Id;
  nome: string;
  nivel: number;
  usuario: Pick<UsuarioApi, "id" | "nome"> | null;
}
