import { Link } from "react-router-dom";
import { buildPath } from "../routes/paths";
import type { Missao } from "../types";
import { DIFICULDADE_COR, DIFICULDADE_LABEL } from "../utils/labels";
import Badge from "./Badge";

interface MissaoCardProps {
  missao: Missao;
}

function MissaoCard({ missao }: MissaoCardProps) {
  return (
    <article className="flex flex-col bg-bgSecondary border border-borderColor rounded-card p-5 md:p-6 text-left transition-all hover:-translate-y-1 hover:border-brandPrimary">
      <div className="flex justify-between items-center mb-4">
        <span className="text-3xl md:text-4xl" aria-hidden="true">
          {missao.icone}
        </span>
        <Badge cor={DIFICULDADE_COR[missao.dificuldade]}>{DIFICULDADE_LABEL[missao.dificuldade]}</Badge>
      </div>
      <h3 className="text-base lg:text-lg font-semibold mb-2">{missao.titulo}</h3>
      <p className="text-textSecondary text-sm mb-6 flex-1">{missao.descricao}</p>
      <div className="flex justify-between items-center gap-3">
        <span className="text-accent font-bold">+{missao.pontos} pts</span>
        <Link
          to={buildPath.missaoDetalhe(missao.id)}
          aria-label={`Ver detalhes da missão ${missao.titulo}`}
          className="bg-brandPrimary text-textPrimary rounded-pill px-5 py-2 font-semibold text-sm transition-colors hover:bg-brandSecondary"
        >
          Ver missão
        </Link>
      </div>
    </article>
  );
}

export default MissaoCard;
