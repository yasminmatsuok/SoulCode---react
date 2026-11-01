// TODAS as rotas da API Java ficam aqui. Nenhuma URL deve ser escrita em outro arquivo.
// Se o back-end usar caminhos diferentes (ex.: "/api/v1/missoes"), ajuste somente este objeto.
import type { Id } from "../types";

export const ENDPOINTS = {
  missoes: {
    listar: "/missoes",
    criar: "/missoes",
    porId: (id: Id) => `/missoes/${id}`,
    concluir: (id: Id) => `/missoes/${id}/conclusoes`,
  },
  recompensas: {
    listar: "/recompensas",
    criar: "/recompensas",
    porId: (id: Id) => `/recompensas/${id}`,
  },
  conversoes: {
    criar: "/conversoes",
    porUsuario: (usuarioId: Id) => `/usuarios/${usuarioId}/conversoes`,
    status: (id: Id) => `/conversoes/${id}/status`,
  },
  saldo: {
    porUsuario: (usuarioId: Id) => `/usuarios/${usuarioId}/saldo`,
  },
  // Rotas já publicadas na API Java (Spring Boot)
  usuarios: {
    listar: "/api/usuarios",
    criar: "/api/usuarios",
    porId: (id: Id) => `/api/usuarios/${id}`,
  },
  avatares: {
    listar: "/api/avatares",
  },
} as const;
