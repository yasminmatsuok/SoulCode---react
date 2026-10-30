import { Link } from "react-router-dom";
import { buildPath } from "../routes/paths";
import type { Recompensa } from "../types";
import { formatarPontos } from "../utils/format";
import { CATEGORIA_LABEL } from "../utils/labels";
import Badge from "./Badge";

interface RecompensaCardProps {
  recompensa: Recompensa;
  saldoDisponivel: number | null;
}

function RecompensaCard({ recompensa, saldoDisponivel }: RecompensaCardProps) {
  const disponivel = recompensa.ativa && recompensa.estoque > 0;
  const faltam = saldoDisponivel === null ? 0 : recompensa.custoPontos - saldoDisponivel;

  return (
    <article
      className={`flex flex-col bg-bgSecondary border border-borderColor rounded-card p-5 md:p-6 text-left transition-all hover:-translate-y-1 hover:border-accent ${
        disponivel ? "" : "opacity-70"
      }`}
    >
      <div className="flex justify-between items-start gap-3 mb-4">
        <span className="text-3xl md:text-4xl" aria-hidden="true">
          {recompensa.icone}
        </span>
        <div className="flex flex-wrap justify-end gap-2">
          <Badge cor="bg-brandPrimary/20 text-brandSecondary">{CATEGORIA_LABEL[recompensa.categoria]}</Badge>
          {!recompensa.ativa && <Badge cor="bg-red-400/20 text-red-300">Inativa</Badge>}
          {recompensa.ativa && recompensa.estoque === 0 && <Badge cor="bg-amber-400/20 text-amber-300">Esgotada</Badge>}
        </div>
      </div>

      <h3 className="text-base lg:text-lg font-semibold mb-2">{recompensa.nome}</h3>
      <p className="text-textSecondary text-sm mb-4 flex-1">{recompensa.descricao}</p>

      <p className="text-xs text-textSecondary mb-4">
        {recompensa.estoque} em estoque
        {disponivel && faltam > 0 && <span className="block text-amber-300 mt-1">Faltam {formatarPontos(faltam)} para resgatar</span>}
      </p>

      <div className="flex justify-between items-center gap-3">
        <span className="text-accent font-bold text-lg">{formatarPontos(recompensa.custoPontos)}</span>
        <Link
          to={buildPath.recompensaDetalhe(recompensa.id)}
          aria-label={`Ver detalhes da recompensa ${recompensa.nome}`}
          className="bg-brandPrimary text-textPrimary rounded-pill px-5 py-2 font-semibold text-sm transition-colors hover:bg-brandSecondary"
        >
          Detalhes
        </Link>
      </div>
    </article>
  );
}

export default RecompensaCard;
