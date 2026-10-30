import { useCallback, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataState, { Spinner } from "../components/DataState";
import FormField from "../components/FormField";
import { useFetch } from "../hooks/useFetch";
import { useIdParam } from "../hooks/useIdParam";
import { useNotification } from "../hooks/useNotification";
import { useRedirectInvalido } from "../hooks/useRedirectInvalido";
import { buildPath, ROUTES } from "../routes/paths";
import { toApiError } from "../services/api";
import { atualizarRecompensa, buscarRecompensa, criarRecompensa } from "../services/recompensaService";
import type { CategoriaRecompensa, NovaRecompensa } from "../types";
import { inputClass } from "../utils/formStyles";
import { CATEGORIA_LABEL, ICONES_RECOMPENSA } from "../utils/labels";

const VAZIA: NovaRecompensa = {
  nome: "",
  descricao: "",
  icone: ICONES_RECOMPENSA[0],
  categoria: "energia",
  custoPontos: 100,
  estoque: 10,
  ativa: true,
};

// Mesma tela para criar (/recompensas/nova) e editar (/recompensas/:id/editar)
function RecompensaForm() {
  const isEdit = useParams().id !== undefined;
  const { id, idBruto } = useIdParam();
  const navigate = useNavigate();
  const { notificar } = useNotification();
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NovaRecompensa>({ defaultValues: VAZIA });

  const fetcher = useCallback(
    () => (isEdit && id !== null ? buscarRecompensa(id) : Promise.resolve(null)),
    [isEdit, id],
  );
  const { data: atual, status, error, recarregar } = useFetch(fetcher);
  useRedirectInvalido({ id: isEdit ? id : 0, idBruto, error, entidade: "Recompensa", destino: ROUTES.recompensas });

  useEffect(() => {
    if (atual) {
      const { nome, descricao, icone, categoria, custoPontos, estoque, ativa } = atual;
      reset({ nome, descricao, icone, categoria, custoPontos, estoque, ativa });
    }
  }, [atual, reset]);

  const onSubmit: SubmitHandler<NovaRecompensa> = async (valores) => {
    setErroEnvio(null);
    try {
      const salva =
        isEdit && id !== null ? await atualizarRecompensa(id, valores) : await criarRecompensa(valores);
      notificar("success", isEdit ? "Recompensa atualizada com sucesso!" : "Recompensa cadastrada com sucesso!");
      navigate(buildPath.recompensaDetalhe(salva.id));
    } catch (err) {
      const mensagem = toApiError(err).message;
      setErroEnvio(mensagem);
      notificar("error", mensagem);
    }
  };

  const voltarPara = isEdit && id !== null ? buildPath.recompensaDetalhe(id) : ROUTES.recompensas;

  if ((isEdit && id === null) || error?.status === 404) return <Spinner label="Redirecionando..." />;

  return (
    <main className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen">
      <div className="container-app max-w-3xl">
        <Link to={voltarPara} className="text-textSecondary hover:text-accent text-sm mb-6 md:mb-8 inline-block rounded">
          ← Voltar
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          {isEdit ? "Editar" : "Nova"} <span className="highlight">recompensa</span>
        </h1>
        <p className="text-textSecondary mb-8">Campos com * são obrigatórios.</p>

        <DataState status={status} error={error} onRetry={recarregar} loadingLabel="Carregando recompensa...">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="bg-bgSecondary border border-borderColor rounded-card p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="md:col-span-2">
              <FormField id="nome" label="Nome *" error={errors.nome?.message}>
                <input
                  id="nome"
                  type="text"
                  placeholder="Ex.: 10% de desconto na conta de luz"
                  aria-invalid={!!errors.nome}
                  className={inputClass(!!errors.nome)}
                  {...register("nome", {
                    required: "Informe o nome da recompensa.",
                    minLength: { value: 3, message: "O nome precisa ter pelo menos 3 caracteres." },
                    maxLength: { value: 80, message: "O nome pode ter no máximo 80 caracteres." },
                    validate: (v) => v.trim().length > 0 || "O nome não pode ficar em branco.",
                  })}
                />
              </FormField>
            </div>

            <FormField id="categoria" label="Categoria *" error={errors.categoria?.message}>
              <select
                id="categoria"
                className={inputClass(!!errors.categoria)}
                {...register("categoria", { required: "Escolha uma categoria." })}
              >
                {(Object.keys(CATEGORIA_LABEL) as CategoriaRecompensa[]).map((valor) => (
                  <option key={valor} value={valor}>
                    {CATEGORIA_LABEL[valor]}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id="icone" label="Ícone *" error={errors.icone?.message}>
              <select id="icone" className={inputClass(!!errors.icone)} {...register("icone", { required: "Escolha um ícone." })}>
                {ICONES_RECOMPENSA.map((icone) => (
                  <option key={icone} value={icone}>
                    {icone}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id="custoPontos" label="Custo em pontos *" error={errors.custoPontos?.message} hint="Entre 10 e 100.000.">
              <input
                id="custoPontos"
                type="number"
                min={10}
                inputMode="numeric"
                aria-invalid={!!errors.custoPontos}
                className={inputClass(!!errors.custoPontos)}
                {...register("custoPontos", {
                  valueAsNumber: true,
                  required: "Informe o custo em pontos.",
                  min: { value: 10, message: "O custo mínimo é 10 pontos." },
                  max: { value: 100000, message: "O custo máximo é 100.000 pontos." },
                  validate: (v) => Number.isInteger(v) || "Use um número inteiro.",
                })}
              />
            </FormField>

            <FormField id="estoque" label="Estoque *" error={errors.estoque?.message}>
              <input
                id="estoque"
                type="number"
                min={0}
                inputMode="numeric"
                aria-invalid={!!errors.estoque}
                className={inputClass(!!errors.estoque)}
                {...register("estoque", {
                  valueAsNumber: true,
                  required: "Informe o estoque.",
                  min: { value: 0, message: "O estoque não pode ser negativo." },
                  max: { value: 10000, message: "O estoque máximo é 10.000 unidades." },
                  validate: (v) => Number.isInteger(v) || "Use um número inteiro.",
                })}
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField id="descricao" label="Descrição *" error={errors.descricao?.message}>
                <textarea
                  id="descricao"
                  rows={4}
                  placeholder="Explique o benefício e como ele é entregue"
                  aria-invalid={!!errors.descricao}
                  className={inputClass(!!errors.descricao)}
                  {...register("descricao", {
                    required: "Descreva a recompensa.",
                    minLength: { value: 15, message: "Escreva pelo menos 15 caracteres." },
                    maxLength: { value: 300, message: "Use no máximo 300 caracteres." },
                  })}
                />
              </FormField>
            </div>

            <label className="md:col-span-2 flex items-center gap-3 text-sm cursor-pointer">
              <input type="checkbox" className="h-5 w-5 accent-brandPrimary" {...register("ativa")} />
              Recompensa ativa (aparece disponível para conversão)
            </label>

            {erroEnvio && (
              <p role="alert" className="md:col-span-2 bg-red-950/60 border border-red-400/50 text-red-200 rounded-lg px-4 py-3 text-sm">
                {erroEnvio}
              </p>
            )}

            <div className="md:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <Link to={voltarPara} className="btn-secondary">
                Cancelar
              </Link>
              <button type="submit" disabled={isSubmitting} className="btn-primary">
                {isSubmitting ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar recompensa"}
              </button>
            </div>
          </form>
        </DataState>
      </div>
    </main>
  );
}

export default RecompensaForm;
