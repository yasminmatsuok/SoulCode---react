import { useParams } from "react-router-dom";
import type { Id } from "../types";

interface IdParam {
  id: Id | null; // null quando o parâmetro não é um número inteiro positivo
  idBruto: string;
}

// Lê e valida o :id da URL das rotas dinâmicas
export function useIdParam(): IdParam {
  const { id = "" } = useParams<{ id: string }>();
  const numero = Number(id);
  return { id: Number.isInteger(numero) && numero > 0 ? numero : null, idBruto: id };
}
