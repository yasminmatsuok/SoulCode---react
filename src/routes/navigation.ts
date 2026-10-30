import { ROUTES, type RoutePath } from "./paths";

export interface NavLinkItem {
  to: RoutePath;
  label: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { to: ROUTES.home, label: "Início" },
  { to: ROUTES.missoes, label: "Missões" },
  { to: ROUTES.recompensas, label: "Recompensas" },
  { to: ROUTES.converter, label: "Converter" },
  { to: ROUTES.historico, label: "Histórico" },
  { to: ROUTES.avatar, label: "Avatar" },
  { to: ROUTES.sobre, label: "Sobre" },
  { to: ROUTES.faq, label: "FAQ" },
  { to: ROUTES.integrantes, label: "Integrantes" },
  { to: ROUTES.contato, label: "Contato" },
];
