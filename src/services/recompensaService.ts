import { ENDPOINTS } from "../config/endpoints";
import { ENV } from "../config/env";
import { toRecompensa, toRecompensaPatch, toRecompensaPayload } from "../mappers/recompensaMapper";
import { mockRecompensas } from "../mocks/mockApi";
import type { AtualizacaoRecompensa, Id, NovaRecompensa, Recompensa, RecompensaApi } from "../types";
import { api } from "./api";

export async function listarRecompensas(): Promise<Recompensa[]> {
  const dados = ENV.useMock
    ? await mockRecompensas.listar()
    : await api.get<RecompensaApi[]>(ENDPOINTS.recompensas.listar);
  return dados.map(toRecompensa);
}

export async function buscarRecompensa(id: Id): Promise<Recompensa> {
  const dado = ENV.useMock
    ? await mockRecompensas.buscar(id)
    : await api.get<RecompensaApi>(ENDPOINTS.recompensas.porId(id));
  return toRecompensa(dado);
}

export async function criarRecompensa(recompensa: NovaRecompensa): Promise<Recompensa> {
  const payload = toRecompensaPayload(recompensa);
  const dado = ENV.useMock
    ? await mockRecompensas.criar(payload)
    : await api.post<RecompensaApi>(ENDPOINTS.recompensas.criar, payload);
  return toRecompensa(dado);
}

export async function atualizarRecompensa(id: Id, recompensa: NovaRecompensa): Promise<Recompensa> {
  const payload = toRecompensaPayload(recompensa);
  const dado = ENV.useMock
    ? await mockRecompensas.atualizar(id, payload)
    : await api.put<RecompensaApi>(ENDPOINTS.recompensas.porId(id), payload);
  return toRecompensa(dado);
}

export async function atualizarRecompensaParcial(id: Id, alteracoes: AtualizacaoRecompensa): Promise<Recompensa> {
  const payload = toRecompensaPatch(alteracoes);
  const dado = ENV.useMock
    ? await mockRecompensas.atualizarParcial(id, payload)
    : await api.patch<RecompensaApi>(ENDPOINTS.recompensas.porId(id), payload);
  return toRecompensa(dado);
}

export async function excluirRecompensa(id: Id): Promise<void> {
  if (ENV.useMock) return mockRecompensas.excluir(id);
  return api.delete(ENDPOINTS.recompensas.porId(id));
}
