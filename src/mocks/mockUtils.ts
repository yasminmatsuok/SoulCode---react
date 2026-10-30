import { ENV } from "../config/env";
import { ApiError, mensagemPorStatus } from "../services/api";

const ATRASO_MIN_MS = 300;
const ATRASO_MAX_MS = 900;

export function erroMock(status: number, mensagem?: string): ApiError {
  return new ApiError(mensagem ?? mensagemPorStatus(status), status);
}

// Simula a rede: atraso aleatório, erro 500 eventual (VITE_MOCK_ERROR_RATE)
// e cópia profunda do resultado, como se viesse de um JSON novo.
export async function simularRequisicao<T>(acao: () => T): Promise<T> {
  const atraso = ATRASO_MIN_MS + Math.random() * (ATRASO_MAX_MS - ATRASO_MIN_MS);
  await new Promise((resolve) => setTimeout(resolve, atraso));

  if (Math.random() < ENV.mockErrorRate) throw erroMock(500);
  return structuredClone(acao());
}

export function proximoId(itens: { id: number }[]): number {
  return itens.reduce((maior, item) => Math.max(maior, item.id), 0) + 1;
}
