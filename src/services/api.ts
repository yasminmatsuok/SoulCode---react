// Cliente HTTP central. Usa apenas fetch (Axios é proibido na Sprint 04).
const BASE_URL: string = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init.headers },
    });
  } catch {
    // fetch só rejeita em falha de rede (API fora do ar, CORS, sem internet)
    throw new ApiError("Não foi possível conectar ao servidor.", 0);
  }

  if (!response.ok) {
    const message =
      response.status === 404
        ? "Recurso não encontrado."
        : `Erro ${response.status} ao comunicar com o servidor.`;
    throw new ApiError(message, response.status);
  }

  // DELETE costuma devolver 204 (sem corpo)
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
