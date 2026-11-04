import { Link } from "react-router-dom";
import { buildPath } from "../routes/paths";
import type { Usuario } from "../types";
import { formatarPontos } from "../utils/format";
import Badge from "./Badge";

interface UsuarioCardProps {
  usuario: Usuario;
}

const iniciais = (nome: string) =>
  nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join("");

function UsuarioCard({ usuario }: UsuarioCardProps) {
  return (
    <article className="flex flex-col bg-bgSecondary border border-borderColor rounded-card p-5 md:p-6 text-left transition-all hover:-translate-y-1 hover:border-accent">
      <div className="flex items-center gap-4 mb-4">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brandPrimary/30 font-bold text-brandSecondary"
        >
          {iniciais(usuario.nome) || "?"}
        </span>
        <div className="min-w-0">
          <h3 className="text-base lg:text-lg font-semibold truncate">{usuario.nome}</h3>
          <p className="text-textSecondary text-sm truncate">{usuario.email}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 flex-1 content-start">
        {usuario.cidade && <Badge cor="bg-brandPrimary/20 text-brandSecondary">📍 {usuario.cidade}</Badge>}
        {usuario.interesse && <Badge cor="bg-green-400/20 text-green-300">{usuario.interesse}</Badge>}
      </div>

      <div className="flex justify-between items-center gap-3">
        <span className="text-accent font-bold text-lg">{formatarPontos(usuario.pontos)}</span>
        <Link
          to={buildPath.usuarioDetalhe(usuario.id)}
          aria-label={`Ver detalhes do usuário ${usuario.nome}`}
          className="bg-brandPrimary text-textPrimary rounded-pill px-5 py-2 font-semibold text-sm transition-colors hover:bg-brandSecondary"
        >
          Detalhes
        </Link>
      </div>
    </article>
  );
}

export default UsuarioCard;
