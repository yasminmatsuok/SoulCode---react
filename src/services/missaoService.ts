import { ENDPOINTS } from "../config/endpoints";
import { ENV } from "../config/env";
import { toMissao, toMissaoPayload } from "../mappers/missaoMapper";
import { toSaldo } from "../mappers/saldoMapper";
import { mockMissoes } from "../mocks/mockApi";
import type { Id, Missao, MissaoApi, NovaMissao, Saldo, SaldoApi } from "../types";
import { api } from "./api";

export async function listarMissoes(): Promise<Missao[]> {
  const dados = ENV.useMock ? await mockMissoes.listar() : await api.get<MissaoApi[]>(ENDPOINTS.missoes.listar);
  return dados.map(toMissao);
}

export async function buscarMissao(id: Id): Promise<Missao> {
  const dado = ENV.useMock ? await mockMissoes.buscar(id) : await api.get<MissaoApi>(ENDPOINTS.missoes.porId(id));
  return toMissao(dado);
}

export async function criarMissao(missao: NovaMissao): Promise<Missao> {
  const payload = toMissaoPayload(missao);
  const dado = ENV.useMock
    ? await mockMissoes.criar(payload)
    : await api.post<MissaoApi>(ENDPOINTS.missoes.criar, payload);
  return toMissao(dado);
}

export async function atualizarMissao(id: Id, missao: NovaMissao): Promise<Missao> {
  const payload = toMissaoPayload(missao);
  const dado = ENV.useMock
    ? await mockMissoes.atualizar(id, payload)
    : await api.put<MissaoApi>(ENDPOINTS.missoes.porId(id), payload);
  return toMissao(dado);
}

export async function excluirMissao(id: Id): Promise<void> {
  if (ENV.useMock) return mockMissoes.excluir(id);
  return api.delete(ENDPOINTS.missoes.porId(id));
}

// Registra a conclusão da missão e devolve o saldo atualizado do usuário
export async function concluirMissao(id: Id): Promise<Saldo> {
  const payload = { usuarioId: ENV.usuarioId };
  const dado = ENV.useMock
    ? await mockMissoes.concluir(id, ENV.usuarioId)
    : await api.post<SaldoApi>(ENDPOINTS.missoes.concluir(id), payload);
  return toSaldo(dado);
}
