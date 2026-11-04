import { ENDPOINTS } from "../config/endpoints";
import { ENV } from "../config/env";
import { toConversao, toConversaoPayload } from "../mappers/conversaoMapper";
import { mockConversoes } from "../mocks/mockApi";
import type { Conversao, ConversaoApi, Id, NovaConversao, StatusConversao } from "../types";
import { api } from "./api";

export async function listarConversoes(): Promise<Conversao[]> {
  const dados = ENV.useMock
    ? await mockConversoes.listarPorUsuario(ENV.usuarioId)
    : await api.get<ConversaoApi[]>(ENDPOINTS.conversoes.porUsuario(ENV.usuarioId));
  return dados.map(toConversao);
}

export async function converterPontos(conversao: NovaConversao): Promise<Conversao> {
  const payload = toConversaoPayload(conversao, ENV.usuarioId);
  const dado = ENV.useMock
    ? await mockConversoes.criar(payload)
    : await api.post<ConversaoApi>(ENDPOINTS.conversoes.criar, payload);
  return toConversao(dado);
}

async function alterarStatus(id: Id, status: StatusConversao): Promise<Conversao> {
  const dado = ENV.useMock
    ? await mockConversoes.atualizarStatus(id, status)
    : await api.patch<ConversaoApi>(ENDPOINTS.conversoes.status(id), { status });
  return toConversao(dado);
}

export const cancelarConversao = (id: Id) => alterarStatus(id, "cancelada");
