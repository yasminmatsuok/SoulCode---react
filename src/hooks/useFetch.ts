import { useCallback, useEffect, useState } from "react";
import { toApiError, type ApiError } from "../services/api";
import type { Status } from "../types";

interface Resultado<T> {
  data: T | null;
  status: Exclude<Status, "loading">;
  error: ApiError | null;
  // identifica qual requisição gerou este resultado
  fetcher: () => Promise<T>;
  tentativa: number;
}

export interface UseFetchResult<T> {
  data: T | null;
  status: Status;
  error: ApiError | null;
  recarregar: () => void;
}

const estaVazio = (data: unknown) => Array.isArray(data) && data.length === 0;

// `fetcher` precisa ser estável: função de módulo ou criada com useCallback.
export function useFetch<T>(fetcher: () => Promise<T>): UseFetchResult<T> {
  const [resultado, setResultado] = useState<Resultado<T> | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    fetcher()
      .then((data) => {
        if (ativo) {
          setResultado({ data, status: estaVazio(data) ? "empty" : "success", error: null, fetcher, tentativa });
        }
      })
      .catch((err: unknown) => {
        if (ativo) setResultado({ data: null, status: "error", error: toApiError(err), fetcher, tentativa });
      });

    // Evita atualizar o estado de um componente que já saiu da tela
    return () => {
      ativo = false;
    };
  }, [fetcher, tentativa]);

  const recarregar = useCallback(() => setTentativa((valor) => valor + 1), []);

  // Enquanto o resultado não for da requisição atual, a tela está carregando
  const atual = resultado && resultado.fetcher === fetcher && resultado.tentativa === tentativa;
  if (!atual) return { data: null, status: "loading", error: null, recarregar };

  return { data: resultado.data, status: resultado.status, error: resultado.error, recarregar };
}
