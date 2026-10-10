import { useCallback, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Loading } from "../components/StatusMessage";
import { useApi } from "../hooks/useApi";
import { createMission, getMission, updateMission } from "../services/missionService";
import type { MissionInput } from "../types";

const EMPTY: MissionInput = {
  icon: "🌍",
  title: "",
  description: "",
  longDescription: "",
  points: 10,
  difficulty: "facil",
};

// Mesma tela para criar (/missoes/nova) e editar (/missoes/:id/editar)
function MissaoForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = id !== undefined;
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MissionInput>({ defaultValues: EMPTY });

  const fetchCurrent = useCallback(
    () => (isEdit ? getMission(id) : Promise.resolve(null)),
    [id, isEdit],
  );
  const { data: current, status, error, reload } = useApi(fetchCurrent);

  useEffect(() => {
    if (current) {
      const { icon, title, description, longDescription, points, difficulty } = current;
      reset({ icon, title, description, longDescription, points, difficulty });
    }
  }, [current, reset]);

  const onSubmit: SubmitHandler<MissionInput> = async (values) => {
    setSubmitError(null);
    try {
      if (isEdit) {
        await updateMission(id, values);
        navigate(`/missoes/${id}`);
      } else {
        await createMission(values);
        navigate("/missoes", { state: { flash: "Missão criada com sucesso!" } });
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Não foi possível salvar.");
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-bgPrimary border rounded-lg px-4 py-3 text-textPrimary focus:outline-none transition-colors ${
      hasError ? "border-red-400" : "border-borderColor focus:border-brandPrimary"
    }`;

  if (isEdit && status === "loading") {
    return (
      <main className="min-h-screen pt-32">
        <Loading message="Carregando missão..." />
      </main>
    );
  }
  if (isEdit && status === "error") {
    return (
      <main className="min-h-screen pt-32">
        <ErrorMessage message={error?.message} onRetry={reload} />
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 px-8 min-h-screen">
      <div className="container-app max-w-2xl">
        <Link to="/missoes" className="text-textSecondary hover:text-accent text-sm mb-8 inline-block">
          ← Voltar para todas as missões
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          {isEdit ? "Editar" : "Nova"} <span className="highlight">missão</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-5">
            <div>
              <label htmlFor="icon" className="block mb-2 text-sm text-textSecondary">Ícone</label>
              <input id="icon" className={inputClass(!!errors.icon)}
                {...register("icon", { required: "Informe um emoji." })} />
              {errors.icon && <span className="text-red-400 text-xs mt-1 block">{errors.icon.message}</span>}
            </div>
            <div>
              <label htmlFor="title" className="block mb-2 text-sm text-textSecondary">Título</label>
              <input id="title" className={inputClass(!!errors.title)}
                {...register("title", { required: "Informe o título da missão." })} />
              {errors.title && <span className="text-red-400 text-xs mt-1 block">{errors.title.message}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-sm text-textSecondary">Descrição curta</label>
            <input id="description" className={inputClass(!!errors.description)}
              {...register("description", { required: "Informe a descrição curta." })} />
            {errors.description && <span className="text-red-400 text-xs mt-1 block">{errors.description.message}</span>}
          </div>

          <div>
            <label htmlFor="longDescription" className="block mb-2 text-sm text-textSecondary">Descrição completa</label>
            <textarea id="longDescription" rows={4} className={inputClass(!!errors.longDescription)}
              {...register("longDescription", { required: "Informe a descrição completa." })} />
            {errors.longDescription && <span className="text-red-400 text-xs mt-1 block">{errors.longDescription.message}</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="points" className="block mb-2 text-sm text-textSecondary">Pontos</label>
              <input id="points" type="number" className={inputClass(!!errors.points)}
                {...register("points", {
                  valueAsNumber: true,
                  required: "Informe os pontos.",
                  min: { value: 1, message: "Os pontos devem ser maiores que zero." },
                })} />
              {errors.points && <span className="text-red-400 text-xs mt-1 block">{errors.points.message}</span>}
            </div>
            <div>
              <label htmlFor="difficulty" className="block mb-2 text-sm text-textSecondary">Dificuldade</label>
              <select id="difficulty" className={inputClass(false)} {...register("difficulty")}>
                <option value="facil">Fácil</option>
                <option value="medio">Médio</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>
          </div>

          {submitError && <p role="alert" className="text-red-400 text-sm">{submitError}</p>}

          <button type="submit" disabled={isSubmitting} className="btn-primary self-start">
            {isSubmitting ? "Salvando..." : "Salvar missão"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default MissaoForm;
