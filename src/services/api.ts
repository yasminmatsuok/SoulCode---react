// Cliente HTTP genérico sobre o fetch nativo (sem Axios).
import { ENV } from "../config/env";
import type { ApiErrorBody, HttpMethod } from "../types";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// status 0 = falha de rede / tempo esgotado (não chegou resposta do servidor)
export const NETWORK_ERROR_STATUS = 0;

const MENSAGENS_PADRAO: Record<number, string> = {
  [NETWORK_ERROR_STATUS]: "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.",
  400: "Os dados enviados são inválidos. Revise o formulário.",
  401: "Sua sessão expirou. Entre novamente.",
  403: "Você não tem permissão para esta ação.",
  404: "O item procurado não foi encontrado.",
  409: "Esta ação entra em conflito com o estado atual dos dados.",
  500: "O servidor encontrou um erro. Tente novamente em instantes.",
};

export function mensagemPorStatus(status: number): string {
  if (MENSAGENS_PADRAO[status]) return MENSAGENS_PADRAO[status];
  return status >= 500 ? MENSAGENS_PADRAO[500] : `Erro inesperado (código ${status}).`;
}

async function lerMensagemDoServidor(response: Response): Promise<string | undefined> {
  try {
    const body = (await response.json()) as ApiErrorBody;
    return body.mensagem ?? body.message;
  } catch {
    return undefined;
  }
}

async function request<T>(method: HttpMethod, path: string, body?: unknown): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ENV.requestTimeoutMs);

  let response: Response;
  try {
    response = await fetch(`${ENV.apiUrl}${path}`, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
  } catch {
    // fetch só rejeita sem resposta: API fora do ar, CORS bloqueado, sem internet ou timeout
    throw new ApiError(mensagemPorStatus(NETWORK_ERROR_STATUS), NETWORK_ERROR_STATUS);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    // Para 4xx mostramos a mensagem do back-end (ex.: "Saldo insuficiente"); 5xx usa a mensagem padrão
    const mensagemServidor = response.status < 500 ? await lerMensagemDoServidor(response) : undefined;
    throw new ApiError(mensagemServidor ?? mensagemPorStatus(response.status), response.status);
  }

  // 204 No Content (comum no DELETE) não tem corpo
  const text = await response.text();
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError("O servidor respondeu em um formato inesperado.", response.status);
  }
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body: unknown) => request<T>("PATCH", path, body),
  delete: <T = void>(path: string) => request<T>("DELETE", path),
};
