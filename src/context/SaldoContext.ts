import { createContext } from "react";
import type { ApiError } from "../services/api";
import type { Saldo, Status } from "../types";

export interface SaldoContextValue {
  saldo: Saldo | null;
  status: Status;
  error: ApiError | null;
  recarregar: () => void;
  // Atualiza o saldo com a resposta de uma operação (ex.: concluir missão) sem nova requisição
  definirSaldo: (saldo: Saldo) => void;
}

export const SaldoContext = createContext<SaldoContextValue | null>(null);
