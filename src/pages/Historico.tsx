import { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import ConfirmDialog from "../components/ConfirmDialog";
import DataState from "../components/DataState";
import PageHero from "../components/PageHero";
import StatCard from "../components/StatCard";
import { useFetch } from "../hooks/useFetch";
import { useNotification } from "../hooks/useNotification";
import { useSaldo } from "../hooks/useSaldo";
import { buildPath, ROUTES } from "../routes/paths";
import { toApiError } from "../services/api";
import { cancelarConversao, listarConversoes } from "../services/conversaoService";
import type { Conversao, StatusConversao } from "../types";
import { formatarData, formatarPontos } from "../utils/format";
import { STATUS_CONVERSAO_COR, STATUS_CONVERSAO_LABEL } from "../utils/labels";

type FiltroStatus = StatusConversao | "todos";

function Historico() {
  const { data: conversoes, status, error, recarregar } = useFetch(listarConversoes);
  const { saldo, recarregar: recarregarSaldo } = useSaldo();
  const { notificar } = useNotification();
  const [filtro, setFiltro] = useState<FiltroStatus>("todos");
  const [cancelando, setCancelando] = useState<Conversao | null>(null);
  const [processando, setProcessando] = useState(false);

  const visiveis = (conversoes ?? []).filter((c) => filtro === "todos" || c.status === filtro);

  async function handleCancelar() {
    if (!cancelando) return;
    setProcessando(true);
    try {
      await cancelarConversao(cancelando.id);
      notificar("success", `Conversão cancelada. ${formatarPontos(cancelando.pontosGastos)} voltaram para o seu saldo.`);
      recarregar();
      recarregarSaldo();
    } catch (err) {
      notificar("error", toApiError(err).message);
    } finally {
      setProcessando(false);
      setCancelando(null);
    }
  }

  return (
    <main>
      <PageHero
        titulo={
          <>
            Histórico de <span className="highlight">Conversões</span>
          </>
        }
        subtitulo="Acompanhe tudo o que você já trocou e o status de cada pedido"
      />

      <section aria-label="Resumo do saldo" className="py-10 md:py-12 bg-bgSecondary">
        <div className="container-app grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <StatCard valor={saldo ? formatarPontos(saldo.pontosDisponiveis) : "..."} label="Disponíveis" />
          <StatCard valor={saldo ? formatarPontos(saldo.pontosAcumulados) : "..."} label="Acumulados" />
          <StatCard valor={saldo ? formatarPontos(saldo.pontosConvertidos) : "..."} label="Convertidos" />
          <StatCard
            valor={saldo ? saldo.nivel.nome : "..."}
            label={
              saldo?.nivel.faltamParaProximo ? `Faltam ${formatarPontos(saldo.nivel.faltamParaProximo)} p/ subir` : "Nível atual"
            }
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div role="group" aria-label="Filtrar por status" className="flex flex-wrap gap-2">
              {(["todos", "pendente", "aprovada", "cancelada"] as FiltroStatus[]).map((valor) => (
                <button
                  key={valor}
                  type="button"
                  aria-pressed={filtro === valor}
                  onClick={() => setFiltro(valor)}
                  className={`rounded-pill px-4 py-2 text-sm border transition-all ${
                    filtro === valor
                      ? "bg-brandPrimary border-brandPrimary"
                      : "bg-bgSecondary border-borderColor text-textSecondary hover:bg-brandPrimary hover:text-textPrimary"
                  }`}
                >
                  {valor === "todos" ? "Todos" : STATUS_CONVERSAO_LABEL[valor]}
                </button>
              ))}
            </div>
            <Link to={ROUTES.converter} className="btn-primary self-start md:self-auto">
              + Nova conversão
            </Link>
          </div>

          <DataState
            status={status}
            error={error}
            onRetry={recarregar}
            loadingLabel="Carregando histórico..."
            empty={{
              titulo: "Você ainda não converteu pontos",
              mensagem: "Escolha uma recompensa no catálogo e faça sua primeira troca.",
              acao: (
                <Link to={ROUTES.recompensas} className="btn-primary">
                  Ver recompensas
                </Link>
              ),
            }}
          >
            {visiveis.length === 0 ? (
              <p className="text-center text-textSecondary py-10">Nenhuma conversão com esse status.</p>
            ) : (
              <ul className="flex flex-col gap-3 list-none">
                {visiveis.map((conversao) => (
                  <li
                    key={conversao.id}
                    className="bg-bgSecondary border border-borderColor rounded-card p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_auto_auto] gap-3 md:gap-6 items-center"
                  >
                    <div>
                      <Link
                        to={buildPath.recompensaDetalhe(conversao.recompensaId)}
                        className="font-semibold hover:text-accent rounded"
                      >
                        {conversao.recompensaNome}
                      </Link>
                      <p className="text-textSecondary text-xs sm:text-sm">
                        Pedido #{conversao.id} · {formatarData(conversao.criadaEm)} · {conversao.quantidade} un.
                      </p>
                    </div>
                    <span className="font-bold text-amber-300 sm:text-right">− {formatarPontos(conversao.pontosGastos)}</span>
                    <Badge cor={STATUS_CONVERSAO_COR[conversao.status]}>{STATUS_CONVERSAO_LABEL[conversao.status]}</Badge>
                    {conversao.status === "pendente" ? (
                      <button
                        type="button"
                        onClick={() => setCancelando(conversao)}
                        className="text-sm text-red-300 hover:text-red-200 underline underline-offset-4 justify-self-start md:justify-self-end rounded"
                      >
                        Cancelar
                      </button>
                    ) : (
                      <span className="hidden md:block w-14" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </DataState>
        </div>
      </section>

      <ConfirmDialog
        aberto={cancelando !== null}
        titulo="Cancelar conversão?"
        mensagem={`O pedido de "${cancelando?.recompensaNome ?? ""}" será cancelado e ${formatarPontos(
          cancelando?.pontosGastos ?? 0,
        )} voltarão para o seu saldo.`}
        textoConfirmar="Sim, cancelar"
        carregando={processando}
        onConfirmar={handleCancelar}
        onCancelar={() => setCancelando(null)}
      />
    </main>
  );
}

export default Historico;
