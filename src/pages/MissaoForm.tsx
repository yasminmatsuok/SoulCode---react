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
import { atualizarMissao, buscarMissao, criarMissao } from "../services/missaoService";
import type { Dificuldade, NovaMissao } from "../types";
import { inputClass } from "../utils/formStyles";
import { DIFICULDADE_LABEL, ICONES_MISSAO } from "../utils/labels";

const VAZIA: NovaMissao = {
  icone: ICONES_MISSAO[0],
  titulo: "",
  descricao: "",
  descricaoLonga: "",
  pontos: 50,
  dificuldade: "facil",
};

// Mesma tela para criar (/missoes/nova) e editar (/missoes/:id/editar)
function MissaoForm() {
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
  } = useForm<NovaMissao>({ defaultValues: VAZIA });

  const fetcher = useCallback(() => (isEdit && id !== null ? buscarMissao(id) : Promise.resolve(null)), [isEdit, id]);
  const { data: atual, status, error, recarregar } = useFetch(fetcher);
  useRedirectInvalido({
    id: isEdit ? id : 0,
    idBruto,
    error,
    entidade: "Missão",
    destino: ROUTES.missoes,
  });

  // Preenche o formulário com os dados vindos da API
  useEffect(() => {
    if (atual) {
      const { icone, titulo, descricao, descricaoLonga, pontos, dificuldade } = atual;
      reset({ icone, titulo, descricao, descricaoLonga, pontos, dificuldade });
    }
  }, [atual, reset]);

  const onSubmit: SubmitHandler<NovaMissao> = async (valores) => {
    setErroEnvio(null);
    try {
      const salva = isEdit && id !== null ? await atualizarMissao(id, valores) : await criarMissao(valores);
      notificar("success", isEdit ? "Missão atualizada com sucesso!" : "Missão criada com sucesso!");
      navigate(buildPath.missaoDetalhe(salva.id));
    } catch (err) {
      const mensagem = toApiError(err).message;
      setErroEnvio(mensagem);
      notificar("error", mensagem);
    }
  };

  const voltarPara = isEdit && id !== null ? buildPath.missaoDetalhe(id) : ROUTES.missoes;

  if ((isEdit && id === null) || error?.status === 404) return <Spinner label="Redirecionando..." />;

  return (
    <main className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen">
      <div className="container-app max-w-3xl">
        <Link to={voltarPara} className="text-textSecondary hover:text-accent text-sm mb-6 md:mb-8 inline-block rounded">
          ← Voltar
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          {isEdit ? "Editar" : "Nova"} <span className="highlight">missão</span>
        </h1>
        <p className="text-textSecondary mb-8">Campos com * são obrigatórios.</p>

        <DataState status={status} error={error} onRetry={recarregar} loadingLabel="Carregando missão...">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="bg-bgSecondary border border-borderColor rounded-card p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="md:col-span-2">
              <FormField id="titulo" label="Título *" error={errors.titulo?.message}>
                <input
                  id="titulo"
                  type="text"
                  placeholder="Ex.: Use Transporte Público"
                  aria-invalid={!!errors.titulo}
                  className={inputClass(!!errors.titulo)}
                  {...register("titulo", {
                    required: "Informe o título da missão.",
                    minLength: { value: 3, message: "O título precisa ter pelo menos 3 caracteres." },
                    maxLength: { value: 60, message: "O título pode ter no máximo 60 caracteres." },
                    validate: (v) => v.trim().length > 0 || "O título não pode ficar em branco.",
                  })}
                />
              </FormField>
            </div>

            <FormField id="icone" label="Ícone *" error={errors.icone?.message}>
              <select id="icone" className={inputClass(!!errors.icone)} {...register("icone", { required: "Escolha um ícone." })}>
                {ICONES_MISSAO.map((icone) => (
                  <option key={icone} value={icone}>
                    {icone}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id="dificuldade" label="Dificuldade *" error={errors.dificuldade?.message}>
              <select
                id="dificuldade"
                className={inputClass(!!errors.dificuldade)}
                {...register("dificuldade", { required: "Escolha a dificuldade." })}
              >
                {(Object.keys(DIFICULDADE_LABEL) as Dificuldade[]).map((valor) => (
                  <option key={valor} value={valor}>
                    {DIFICULDADE_LABEL[valor]}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id="pontos" label="Pontos *" error={errors.pontos?.message} hint="Entre 1 e 1.000 pontos.">
              <input
                id="pontos"
                type="number"
                min={1}
                max={1000}
                inputMode="numeric"
                aria-invalid={!!errors.pontos}
                className={inputClass(!!errors.pontos)}
                {...register("pontos", {
                  valueAsNumber: true,
                  required: "Informe quantos pontos a missão vale.",
                  min: { value: 1, message: "A missão deve valer pelo menos 1 ponto." },
                  max: { value: 1000, message: "A missão pode valer no máximo 1.000 pontos." },
                  validate: (v) => Number.isInteger(v) || "Use um número inteiro.",
                })}
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField id="descricao" label="Resumo *" error={errors.descricao?.message} hint="Aparece no card da listagem.">
                <input
                  id="descricao"
                  type="text"
                  placeholder="Uma frase sobre a missão"
                  aria-invalid={!!errors.descricao}
                  className={inputClass(!!errors.descricao)}
                  {...register("descricao", {
                    required: "Informe um resumo.",
                    minLength: { value: 10, message: "O resumo precisa ter pelo menos 10 caracteres." },
                    maxLength: { value: 140, message: "O resumo pode ter no máximo 140 caracteres." },
                  })}
                />
              </FormField>
            </div>

            <div className="md:col-span-2">
              <FormField id="descricaoLonga" label="Como cumprir a missão *" error={errors.descricaoLonga?.message}>
                <textarea
                  id="descricaoLonga"
                  rows={5}
                  placeholder="Explique o passo a passo e como comprovar"
                  aria-invalid={!!errors.descricaoLonga}
                  className={inputClass(!!errors.descricaoLonga)}
                  {...register("descricaoLonga", {
                    required: "Explique como cumprir a missão.",
                    minLength: { value: 20, message: "Escreva pelo menos 20 caracteres." },
                    maxLength: { value: 600, message: "Use no máximo 600 caracteres." },
                  })}
                />
              </FormField>
            </div>

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
                {isSubmitting ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar missão"}
              </button>
            </div>
          </form>
        </DataState>
      </div>
    </main>
  );
}

export default MissaoForm;
