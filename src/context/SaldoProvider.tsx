import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { toApiError, type ApiError } from "../services/api";
import { buscarSaldo } from "../services/saldoService";
import type { Saldo, Status } from "../types";
import { SaldoContext } from "./SaldoContext";

interface SaldoProviderProps {
  children: ReactNode;
}

// Saldo de pontos compartilhado por todas as telas (header, missões, conversão, histórico)
function SaldoProvider({ children }: SaldoProviderProps) {
  const [saldo, setSaldo] = useState<Saldo | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<ApiError | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    buscarSaldo()
      .then((dado) => {
        if (!ativo) return;
        setSaldo(dado);
        setError(null);
        setStatus("success");
      })
      .catch((err: unknown) => {
        if (!ativo) return;
        setError(toApiError(err));
        setStatus("error");
      });
    return () => {
      ativo = false;
    };
  }, [tentativa]);

  const recarregar = useCallback(() => setTentativa((valor) => valor + 1), []);

  const definirSaldo = useCallback((novo: Saldo) => {
    setSaldo(novo);
    setStatus("success");
  }, []);

  const value = useMemo(
    () => ({ saldo, status, error, recarregar, definirSaldo }),
    [saldo, status, error, recarregar, definirSaldo],
  );

  return <SaldoContext.Provider value={value}>{children}</SaldoContext.Provider>;
}

export default SaldoProvider;
