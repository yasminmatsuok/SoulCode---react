import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../components/Badge";
import ConfirmDialog from "../components/ConfirmDialog";
import DataState, { Spinner } from "../components/DataState";
import { useFetch } from "../hooks/useFetch";
import { useIdParam } from "../hooks/useIdParam";
import { useNotification } from "../hooks/useNotification";
import { useRedirectInvalido } from "../hooks/useRedirectInvalido";
import { useSaldo } from "../hooks/useSaldo";
import { buildPath, ROUTES } from "../routes/paths";
import { toApiError } from "../services/api";
import { atualizarRecompensaParcial, buscarRecompensa, excluirRecompensa } from "../services/recompensaService";
import type { Recompensa } from "../types";
import { formatarData, formatarPontos } from "../utils/format";
import { CATEGORIA_LABEL } from "../utils/labels";

function RecompensaDetalhe() {
  const { id, idBruto } = useIdParam();
  const navigate = useNavigate();
  const { notificar } = useNotification();
  const { saldo } = useSaldo();
  const [confirmando, setConfirmando] = useState(false);
  const [processando, setProcessando] = useState<"excluir" | "status" | null>(null);
  // Versão atualizada após o PATCH (evita buscar tudo de novo)
  const [atualizada, setAtualizada] = useState<Recompensa | null>(null);

  const fetcher = useCallback(() => (id === null ? Promise.resolve(null) : buscarRecompensa(id)), [id]);
  const { data, status, error, recarregar } = useFetch(fetcher);
  useRedirectInvalido({ id, idBruto, error, entidade: "Recompensa", destino: ROUTES.recompensas });

  const recompensa = atualizada?.id === data?.id ? atualizada : data;

  async function handleAlternarStatus() {
    if (!recompensa) return;
    setProcessando("status");
    try {
      const nova = await atualizarRecompensaParcial(recompensa.id, { ativa: !recompensa.ativa });
      setAtualizada(nova);
      notificar("success", nova.ativa ? "Recompensa ativada no catálogo." : "Recompensa desativada do catálogo.");
    } catch (err) {
      notificar("error", toApiError(err).message);
    } finally {
      setProcessando(null);
    }
  }

  async function handleExcluir() {
    if (!recompensa) return;
    setProcessando("excluir");
    try {
      await excluirRecompensa(recompensa.id);
      notificar("success", `Recompensa "${recompensa.nome}" excluída com sucesso.`);
      navigate(ROUTES.recompensas);
    } catch (err) {
      notificar("error", toApiError(err).message);
      setProcessando(null);
      setConfirmando(false);
    }
  }

  if (id === null || error?.status === 404) return <Spinner label="Redirecionando..." />;

  const podeConverter = recompensa !== null && recompensa.ativa && recompensa.estoque > 0;
  const saldoSuficiente = recompensa !== null && saldo !== null && saldo.pontosDisponiveis >= recompensa.custoPontos;

  return (
    <main className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen">
      <div className="container-app max-w-4xl">
        <Link to={ROUTES.recompensas} className="text-textSecondary hover:text-accent text-sm mb-6 md:mb-8 inline-block rounded">
          ← Voltar para o catálogo
        </Link>

        <DataState status={status} error={error} onRetry={recarregar} loadingLabel="Carregando recompensa...">
          {recompensa && (
            <article className="grid lg:grid-cols-[1fr_320px] gap-6">
              <div className="bg-bgSecondary border border-borderColor rounded-card p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge cor="bg-brandPrimary/20 text-brandSecondary">{CATEGORIA_LABEL[recompensa.categoria]}</Badge>
                  <Badge cor={recompensa.ativa ? "bg-green-400/20 text-green-300" : "bg-red-400/20 text-red-300"}>
                    {recompensa.ativa ? "Ativa" : "Inativa"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl sm:text-6xl" aria-hidden="true">
                    {recompensa.icone}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold">{recompensa.nome}</h1>
                </div>
                <p className="text-textSecondary text-sm sm:text-base mb-8">{recompensa.descricao}</p>

                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-borderColor pt-6 text-sm">
                  <div>
                    <dt className="text-textSecondary">Custo</dt>
                    <dd className="font-bold text-accent text-lg">{formatarPontos(recompensa.custoPontos)}</dd>
                  </div>
                  <div>
                    <dt className="text-textSecondary">Estoque</dt>
                    <dd className="font-bold text-lg">{recompensa.estoque} un.</dd>
                  </div>
                  <div>
                    <dt className="text-textSecondary">Cadastrada em</dt>
                    <dd className="font-semibold">{formatarData(recompensa.criadaEm)}</dd>
                  </div>
                </dl>
              </div>

              <aside className="flex flex-col gap-4">
                <div className="bg-bgSecondary border border-borderColor rounded-card p-6">
                  <h2 className="font-semibold mb-2">Converter pontos</h2>
                  <p className="text-textSecondary text-sm mb-4">
                    {!podeConverter
                      ? "Esta recompensa não está disponível para conversão no momento."
                      : saldoSuficiente
                        ? `Você tem ${formatarPontos(saldo?.pontosDisponiveis ?? 0)}. Dá para resgatar!`
                        : `Você precisa de mais ${formatarPontos(recompensa.custoPontos - (saldo?.pontosDisponiveis ?? 0))}.`}
                  </p>
                  {podeConverter ? (
                    <Link to={buildPath.converterRecompensa(recompensa.id)} className="btn-primary w-full">
                      Converter agora
                    </Link>
                  ) : (
                    <button type="button" disabled className="btn-primary w-full">
                      Indisponível
                    </button>
                  )}
                </div>

                <div className="bg-bgSecondary border border-borderColor rounded-card p-6 flex flex-col gap-3">
                  <h2 className="font-semibold">Gerenciar</h2>
                  <Link to={buildPath.recompensaEditar(recompensa.id)} className="btn-secondary w-full">
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={handleAlternarStatus}
                    disabled={processando !== null}
                    className="btn-secondary w-full"
                  >
                    {processando === "status" ? "Salvando..." : recompensa.ativa ? "Desativar" : "Ativar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmando(true)}
                    disabled={processando !== null}
                    className="btn-danger w-full"
                  >
                    Excluir
                  </button>
                </div>
              </aside>
            </article>
          )}
        </DataState>
      </div>

      <ConfirmDialog
        aberto={confirmando}
        titulo="Excluir recompensa?"
        mensagem={`"${recompensa?.nome ?? ""}" sairá do catálogo permanentemente. Conversões já feitas continuam no histórico.`}
        textoConfirmar="Sim, excluir"
        carregando={processando === "excluir"}
        onConfirmar={handleExcluir}
        onCancelar={() => setConfirmando(false)}
      />
    </main>
  );
}

export default RecompensaDetalhe;
