import { useCallback, useEffect, useState } from "react";
import { toApiError, type ApiError } from "../services/api";
import type { Status } from "../types";

interface FetchState<T> {
  data: T | null;
  status: Status;
  error: ApiError | null;
}

export interface UseFetchResult<T> extends FetchState<T> {
  recarregar: () => void;
}

const estaVazio = (data: unknown) => Array.isArray(data) && data.length === 0;

// `fetcher` precisa ser estável: função de módulo ou criada com useCallback.
export function useFetch<T>(fetcher: () => Promise<T>): UseFetchResult<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, status: "loading", error: null });
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    setState((anterior) => (anterior.status === "loading" ? anterior : { ...anterior, status: "loading" }));

    fetcher()
      .then((data) => {
        if (ativo) setState({ data, status: estaVazio(data) ? "empty" : "success", error: null });
      })
      .catch((err: unknown) => {
        if (ativo) setState({ data: null, status: "error", error: toApiError(err) });
      });

    // Evita atualizar o estado de um componente que já saiu da tela
    return () => {
      ativo = false;
    };
  }, [fetcher, tentativa]);

  const recarregar = useCallback(() => setTentativa((valor) => valor + 1), []);

  return { ...state, recarregar };
}
