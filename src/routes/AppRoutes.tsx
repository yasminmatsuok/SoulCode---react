import type { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import Avatar from "../pages/Avatar";
import Contato from "../pages/Contato";
import Converter from "../pages/Converter";
import Faq from "../pages/Faq";
import Historico from "../pages/Historico";
import Home from "../pages/Home";
import Integrantes from "../pages/Integrantes";
import MissaoDetalhe from "../pages/MissaoDetalhe";
import MissaoForm from "../pages/MissaoForm";
import Missoes from "../pages/Missoes";
import NotFound from "../pages/NotFound";
import RecompensaDetalhe from "../pages/RecompensaDetalhe";
import RecompensaForm from "../pages/RecompensaForm";
import Recompensas from "../pages/Recompensas";
import Sobre from "../pages/Sobre";
import UsuarioDetalhe from "../pages/UsuarioDetalhe";
import UsuarioForm from "../pages/UsuarioForm";
import Usuarios from "../pages/Usuarios";
import { ROUTES, type RoutePath } from "./paths";

interface AppRoute {
  path: RoutePath;
  element: ReactElement;
}

// "nova" vem antes de ":id" só por legibilidade: o React Router prioriza rotas estáticas
const APP_ROUTES: AppRoute[] = [
  { path: ROUTES.home, element: <Home /> },
  { path: ROUTES.sobre, element: <Sobre /> },
  { path: ROUTES.avatar, element: <Avatar /> },
  { path: ROUTES.faq, element: <Faq /> },
  { path: ROUTES.integrantes, element: <Integrantes /> },
  { path: ROUTES.contato, element: <Contato /> },
  { path: ROUTES.missoes, element: <Missoes /> },
  { path: ROUTES.missaoNova, element: <MissaoForm /> },
  { path: ROUTES.missaoDetalhe, element: <MissaoDetalhe /> },
  { path: ROUTES.missaoEditar, element: <MissaoForm /> },
  { path: ROUTES.recompensas, element: <Recompensas /> },
  { path: ROUTES.recompensaNova, element: <RecompensaForm /> },
  { path: ROUTES.recompensaDetalhe, element: <RecompensaDetalhe /> },
  { path: ROUTES.recompensaEditar, element: <RecompensaForm /> },
  { path: ROUTES.converter, element: <Converter /> },
  { path: ROUTES.historico, element: <Historico /> },
  { path: ROUTES.usuarios, element: <Usuarios /> },
  { path: ROUTES.usuarioNovo, element: <UsuarioForm /> },
  { path: ROUTES.usuarioDetalhe, element: <UsuarioDetalhe /> },
  { path: ROUTES.usuarioEditar, element: <UsuarioForm /> },
  { path: ROUTES.notFound, element: <NotFound /> },
];

function AppRoutes() {
  return (
    <Routes>
      {APP_ROUTES.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default AppRoutes;
