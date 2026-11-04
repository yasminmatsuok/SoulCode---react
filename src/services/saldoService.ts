import { ENDPOINTS } from "../config/endpoints";
import { ENV } from "../config/env";
import { toSaldo } from "../mappers/saldoMapper";
import { mockSaldo } from "../mocks/mockApi";
import type { Saldo, SaldoApi } from "../types";
import { api } from "./api";

export async function buscarSaldo(): Promise<Saldo> {
  const dado = ENV.useMock
    ? await mockSaldo.buscar(ENV.usuarioId)
    : await api.get<SaldoApi>(ENDPOINTS.saldo.porUsuario(ENV.usuarioId));
  return toSaldo(dado);
}
