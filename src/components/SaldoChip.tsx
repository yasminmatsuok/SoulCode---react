import { Link } from "react-router-dom";
import { useSaldo } from "../hooks/useSaldo";
import { ROUTES } from "../routes/paths";
import { formatarPontos } from "../utils/format";

// Saldo sempre visível no header, vindo do SaldoContext
function SaldoChip() {
  const { saldo, status } = useSaldo();

  const texto = status === "error" ? "Saldo indisponível" : saldo ? formatarPontos(saldo.pontosDisponiveis) : "...";

  return (
    <Link
      to={ROUTES.historico}
      aria-label={`Seu saldo: ${texto}. Ver histórico de conversões`}
      className="flex items-center gap-2 bg-bgSecondary border border-borderColor rounded-pill px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold transition-colors hover:border-accent"
    >
      <span aria-hidden="true">🪙</span>
      <span className={status === "error" ? "text-red-300" : "text-accent"}>{texto}</span>
    </Link>
  );
}

export default SaldoChip;
