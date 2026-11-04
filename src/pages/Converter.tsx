import { useEffect, useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DataState from "../components/DataState";
import FormField from "../components/FormField";
import PageHero from "../components/PageHero";
import { useFetch } from "../hooks/useFetch";
import { useNotification } from "../hooks/useNotification";
import { useSaldo } from "../hooks/useSaldo";
import { buildPath, ROUTES } from "../routes/paths";
import { toApiError } from "../services/api";
import { converterPontos } from "../services/conversaoService";
import { listarRecompensas } from "../services/recompensaService";
import type { NovaConversao, Recompensa } from "../types";
import { formatarPontos } from "../utils/format";
import { inputClass } from "../utils/formStyles";

const MAX_POR_PEDIDO = 10;

// Só entra na lista o que pode ser convertido agora
const listarDisponiveis = async (): Promise<Recompensa[]> =>
  (await listarRecompensas()).filter((r) => r.ativa && r.estoque > 0);

function Converter() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { notificar } = useNotification();
  const { saldo, status: statusSaldo, recarregar: recarregarSaldo } = useSaldo();
  const { data: recompensas, status, error, recarregar } = useFetch(listarDisponiveis);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  const idSugerido = Number(searchParams.get("recompensa")) || 0;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NovaConversao>({ defaultValues: { recompensaId: idSugerido, quantidade: 1 } });

  // Link vindo de uma recompensa que não está mais disponível: limpa a seleção e avisa
  useEffect(() => {
    if (recompensas && idSugerido && !recompensas.some((r) => r.id === idSugerido)) {
      setValue("recompensaId", 0);
      notificar("info", `A recompensa #${idSugerido} não está disponível para conversão. Escolha outra.`);
    }
  }, [recompensas, idSugerido, setValue, notificar]);

  const [recompensaId, quantidade] = useWatch({ control, name: ["recompensaId", "quantidade"] });
  const selecionada = recompensas?.find((r) => r.id === Number(recompensaId)) ?? null;
  const qtd = Number.isInteger(quantidade) && quantidade > 0 ? quantidade : 0;
  const total = selecionada ? selecionada.custoPontos * qtd : 0;
  const disponivel = saldo?.pontosDisponiveis ?? 0;
  const saldoApos = disponivel - total;

  const onSubmit: SubmitHandler<NovaConversao> = async (valores) => {
    setErroEnvio(null);
    try {
      const conversao = await converterPontos(valores);
      recarregarSaldo();
      notificar(
        "success",
        `Conversão realizada! ${formatarPontos(conversao.pontosGastos)} trocados por "${conversao.recompensaNome}".`,
      );
      navigate(ROUTES.historico);
    } catch (err) {
      const mensagem = toApiError(err).message;
      setErroEnvio(mensagem);
      notificar("error", mensagem);
    }
  };

  return (
    <main>
      <PageHero
        titulo={
          <>
            Converta seus <span className="highlight">pontos</span>
          </>
        }
        subtitulo="Escolha uma recompensa, defina a quantidade e confirme a troca"
      />

      <section className="py-12 md:py-16">
        <div className="container-app grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
          <DataState
            status={status}
            error={error}
            onRetry={recarregar}
            loadingLabel="Carregando recompensas disponíveis..."
            empty={{
              titulo: "Nenhuma recompensa disponível",
              mensagem: "No momento não há recompensas ativas com estoque. Volte mais tarde!",
              acao: (
                <Link to={ROUTES.recompensas} className="btn-primary">
                  Ver catálogo
                </Link>
              ),
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bg-bgSecondary border border-borderColor rounded-card p-5 sm:p-8 flex flex-col gap-5"
            >
              <FormField id="recompensaId" label="Recompensa *" error={errors.recompensaId?.message}>
                <select
                  id="recompensaId"
                  aria-invalid={!!errors.recompensaId}
                  className={inputClass(!!errors.recompensaId)}
                  {...register("recompensaId", {
                    valueAsNumber: true,
                    validate: (v) => v > 0 || "Escolha uma recompensa.",
                  })}
                >
                  <option value={0}>Selecione...</option>
                  {recompensas?.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.icone} {r.nome} — {formatarPontos(r.custoPontos)}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                id="quantidade"
                label="Quantidade *"
                error={errors.quantidade?.message}
                hint={selecionada ? `Disponível: ${selecionada.estoque} un. (máx. ${MAX_POR_PEDIDO} por pedido)` : undefined}
              >
                <input
                  id="quantidade"
                  type="number"
                  min={1}
                  max={MAX_POR_PEDIDO}
                  inputMode="numeric"
                  aria-invalid={!!errors.quantidade}
                  className={inputClass(!!errors.quantidade)}
                  {...register("quantidade", {
                    valueAsNumber: true,
                    required: "Informe a quantidade.",
                    validate: {
                      inteiro: (v) => (Number.isInteger(v) && v >= 1) || "Use um número inteiro a partir de 1.",
                      limite: (v) => v <= MAX_POR_PEDIDO || `Máximo de ${MAX_POR_PEDIDO} unidades por pedido.`,
                      estoque: (v) =>
                        !selecionada || v <= selecionada.estoque || `Só restam ${selecionada.estoque} unidade(s) em estoque.`,
                      saldo: (v) =>
                        !selecionada ||
                        selecionada.custoPontos * v <= disponivel ||
                        `Saldo insuficiente: você tem ${formatarPontos(disponivel)}.`,
                    },
                  })}
                />
              </FormField>

              {selecionada && <p className="text-textSecondary text-sm">{selecionada.descricao}</p>}

              {erroEnvio && (
                <p role="alert" className="bg-red-950/60 border border-red-400/50 text-red-200 rounded-lg px-4 py-3 text-sm">
                  {erroEnvio}
                </p>
              )}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                {selecionada && (
                  <Link to={buildPath.recompensaDetalhe(selecionada.id)} className="btn-secondary">
                    Ver detalhes
                  </Link>
                )}
                <button type="submit" disabled={isSubmitting || statusSaldo !== "success"} className="btn-primary">
                  {isSubmitting ? "Convertendo..." : "Confirmar conversão"}
                </button>
              </div>
            </form>
          </DataState>

          <aside aria-label="Resumo da conversão" className="bg-bgSecondary border border-borderColor rounded-card p-6 lg:sticky lg:top-28">
            <h2 className="font-semibold text-lg mb-4">Resumo</h2>
            {statusSaldo === "error" ? (
              <p className="text-red-300 text-sm">
                Não foi possível carregar seu saldo.{" "}
                <button type="button" onClick={recarregarSaldo} className="underline hover:text-accent">
                  Tentar novamente
                </button>
              </p>
            ) : (
              <dl className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-textSecondary">Saldo atual</dt>
                  <dd className="font-semibold">{saldo ? formatarPontos(disponivel) : "..."}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-textSecondary">Custo da conversão</dt>
                  <dd className="font-semibold text-amber-300">− {formatarPontos(total)}</dd>
                </div>
                <div className="flex justify-between border-t border-borderColor pt-3 text-base">
                  <dt>Saldo após</dt>
                  <dd className={`font-bold ${saldoApos < 0 ? "text-red-400" : "text-accent"}`}>{formatarPontos(saldoApos)}</dd>
                </div>
              </dl>
            )}
            <Link to={ROUTES.historico} className="block mt-6 text-sm text-textSecondary hover:text-accent rounded">
              Ver histórico de conversões →
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Converter;
