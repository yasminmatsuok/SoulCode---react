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
import { buscarMissao, concluirMissao, excluirMissao } from "../services/missaoService";
import { formatarPontos } from "../utils/format";
import { DIFICULDADE_COR, DIFICULDADE_LABEL } from "../utils/labels";

function MissaoDetalhe() {
  const { id, idBruto } = useIdParam();
  const navigate = useNavigate();
  const { notificar } = useNotification();
  const { definirSaldo } = useSaldo();
  const [confirmando, setConfirmando] = useState(false);
  const [processando, setProcessando] = useState<"excluir" | "concluir" | null>(null);

  const fetcher = useCallback(() => (id === null ? Promise.resolve(null) : buscarMissao(id)), [id]);
  const { data: missao, status, error, recarregar } = useFetch(fetcher);
  useRedirectInvalido({ id, idBruto, error, entidade: "Missão", destino: ROUTES.missoes });

  async function handleConcluir() {
    if (!missao) return;
    setProcessando("concluir");
    try {
      const saldo = await concluirMissao(missao.id);
      definirSaldo(saldo);
      notificar("success", `Missão concluída! +${missao.pontos} pontos. Saldo: ${formatarPontos(saldo.pontosDisponiveis)}.`);
    } catch (err) {
      notificar("error", toApiError(err).message);
    } finally {
      setProcessando(null);
    }
  }

  async function handleExcluir() {
    if (!missao) return;
    setProcessando("excluir");
    try {
      await excluirMissao(missao.id);
      notificar("success", `Missão "${missao.titulo}" excluída com sucesso.`);
      navigate(ROUTES.missoes);
    } catch (err) {
      notificar("error", toApiError(err).message);
      setProcessando(null);
      setConfirmando(false);
    }
  }

  if (id === null || error?.status === 404) return <Spinner label="Redirecionando..." />;

  return (
    <main className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen">
      <div className="container-app max-w-3xl">
        <Link to={ROUTES.missoes} className="text-textSecondary hover:text-accent text-sm mb-6 md:mb-8 inline-block rounded">
          ← Voltar para todas as missões
        </Link>

        <DataState status={status} error={error} onRetry={recarregar} loadingLabel="Carregando missão...">
          {missao && (
            <article className="bg-bgSecondary border border-borderColor rounded-card p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl sm:text-5xl" aria-hidden="true">
                    {missao.icone}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold">{missao.titulo}</h1>
                </div>
                <Badge cor={DIFICULDADE_COR[missao.dificuldade]}>{DIFICULDADE_LABEL[missao.dificuldade]}</Badge>
              </div>

              <p className="text-textPrimary mb-3">{missao.descricao}</p>
              <p className="text-textSecondary text-sm sm:text-base mb-8">{missao.descricaoLonga}</p>

              <div className="flex items-center justify-between border-t border-borderColor pt-6 mb-8">
                <span className="text-textSecondary">Recompensa da missão</span>
                <span className="font-bold text-lg sm:text-xl text-accent">+{formatarPontos(missao.pontos)}</span>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleConcluir}
                  disabled={processando !== null}
                  className="btn-primary"
                >
                  {processando === "concluir" ? "Registrando..." : "✔ Concluir missão"}
                </button>
                <Link to={buildPath.missaoEditar(missao.id)} className="btn-secondary">
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => setConfirmando(true)}
                  disabled={processando !== null}
                  className="btn-danger sm:ml-auto"
                >
                  Excluir
                </button>
              </div>
            </article>
          )}
        </DataState>
      </div>

      <ConfirmDialog
        aberto={confirmando}
        titulo="Excluir missão?"
        mensagem={`A missão "${missao?.titulo ?? ""}" será removida permanentemente. Esta ação não pode ser desfeita.`}
        textoConfirmar="Sim, excluir"
        carregando={processando === "excluir"}
        onConfirmar={handleExcluir}
        onCancelar={() => setConfirmando(false)}
      />
    </main>
  );
}

export default MissaoDetalhe;
