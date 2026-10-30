import type { Id } from "../types";

// Todas as rotas da aplicação em um único lugar
export const ROUTES = {
  home: "/",
  sobre: "/sobre",
  avatar: "/avatar",
  faq: "/faq",
  integrantes: "/integrantes",
  contato: "/contato",
  missoes: "/missoes",
  missaoNova: "/missoes/nova",
  missaoDetalhe: "/missoes/:id",
  missaoEditar: "/missoes/:id/editar",
  recompensas: "/recompensas",
  recompensaNova: "/recompensas/nova",
  recompensaDetalhe: "/recompensas/:id",
  recompensaEditar: "/recompensas/:id/editar",
  converter: "/converter",
  historico: "/historico",
  notFound: "*",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

// Monta as rotas dinâmicas com o id preenchido
export const buildPath = {
  missaoDetalhe: (id: Id) => `/missoes/${id}`,
  missaoEditar: (id: Id) => `/missoes/${id}/editar`,
  recompensaDetalhe: (id: Id) => `/recompensas/${id}`,
  recompensaEditar: (id: Id) => `/recompensas/${id}/editar`,
  converterRecompensa: (id: Id) => `/converter?recompensa=${id}`,
};
