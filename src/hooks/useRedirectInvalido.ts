import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { RoutePath } from "../routes/paths";
import type { ApiError } from "../services/api";
import type { Id } from "../types";
import { useNotification } from "./useNotification";

interface RedirectInvalidoParams {
  id: Id | null;
  idBruto: string;
  error: ApiError | null;
  entidade: string; // ex.: "Recompensa"
  masculino?: boolean; // concordância da mensagem ("encontrado" x "encontrada")
  destino: RoutePath;
}

// Id inválido na URL ou item inexistente (404): volta para a listagem com uma mensagem personalizada
export function useRedirectInvalido({ id, idBruto, error, entidade, destino, masculino = false }: RedirectInvalidoParams) {
  const navigate = useNavigate();
  const { notificar } = useNotification();
  const redirecionou = useRef(false);
  const naoEncontrado = error?.status === 404;

  useEffect(() => {
    if ((id !== null && !naoEncontrado) || redirecionou.current) return;
    redirecionou.current = true;

    const mensagem =
      id === null
        ? `"${idBruto}" não é um código válido de ${entidade.toLowerCase()}.`
        : masculino
          ? `${entidade} #${id} não foi encontrado. Ele pode ter sido excluído.`
          : `${entidade} #${id} não foi encontrada. Ela pode ter sido excluída.`;
    notificar("error", mensagem);
    navigate(destino, { replace: true });
  }, [id, idBruto, naoEncontrado, entidade, destino, masculino, navigate, notificar]);
}
