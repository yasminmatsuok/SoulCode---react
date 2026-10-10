import { useCallback, useEffect, useState } from "react";
import type { RequestStatus } from "../types";
import { ApiError } from "../services/api";

interface UseApiResult<T> {
  data: T | null;
  status: RequestStatus;
  error: ApiError | null;
  reload: () => void;
}

// `fetcher` deve ser estável (função de módulo ou useCallback).
export function useApi<T>(fetcher: () => Promise<T>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [error, setError] = useState<ApiError | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setError(null);
        setStatus("success");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err : new ApiError("Erro inesperado.", -1));
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [fetcher, tick]);

  const reload = useCallback(() => {
    setStatus("loading");
    setTick((t) => t + 1);
  }, []);
  return { data, status, error, reload };
}
