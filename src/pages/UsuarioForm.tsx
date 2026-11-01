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
import { atualizarUsuario, buscarUsuario, criarUsuario } from "../services/usuarioService";
import type { NovoUsuario } from "../types";
import { inputClass } from "../utils/formStyles";
import { INTERESSES } from "../utils/labels";

const VAZIO: NovoUsuario = {
  nome: "",
  email: "",
  senha: "",
  idade: 18,
  cidade: "",
  interesse: INTERESSES[0],
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mesma tela para criar (/usuarios/novo) e editar (/usuarios/:id/editar)
function UsuarioForm() {
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
  } = useForm<NovoUsuario>({ defaultValues: VAZIO });

  const fetcher = useCallback(() => (isEdit && id !== null ? buscarUsuario(id) : Promise.resolve(null)), [isEdit, id]);
  const { data: atual, status, error, recarregar } = useFetch(fetcher);
  useRedirectInvalido({
    id: isEdit ? id : 0,
    idBruto,
    error,
    entidade: "Usuário",
    destino: ROUTES.usuarios,
    masculino: true,
  });

  useEffect(() => {
    if (atual) {
      const { nome, email, idade, cidade, interesse } = atual;
      // A senha nunca volta da API: precisa ser digitada de novo para salvar
      reset({ nome, email, senha: "", idade: idade || VAZIO.idade, cidade, interesse: interesse || VAZIO.interesse });
    }
  }, [atual, reset]);

  const onSubmit: SubmitHandler<NovoUsuario> = async (valores) => {
    setErroEnvio(null);
    try {
      const salvo = isEdit && id !== null ? await atualizarUsuario(id, valores) : await criarUsuario(valores);
      notificar("success", isEdit ? "Usuário atualizado com sucesso!" : "Usuário cadastrado com sucesso!");
      navigate(buildPath.usuarioDetalhe(salvo.id));
    } catch (err) {
      const mensagem = toApiError(err).message;
      setErroEnvio(mensagem);
      notificar("error", mensagem);
    }
  };

  const voltarPara = isEdit && id !== null ? buildPath.usuarioDetalhe(id) : ROUTES.usuarios;

  if ((isEdit && id === null) || error?.status === 404) return <Spinner label="Redirecionando..." />;

  return (
    <main className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen">
      <div className="container-app max-w-3xl">
        <Link to={voltarPara} className="text-textSecondary hover:text-accent text-sm mb-6 md:mb-8 inline-block rounded">
          ← Voltar
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          {isEdit ? "Editar" : "Novo"} <span className="highlight">usuário</span>
        </h1>
        <p className="text-textSecondary mb-8">Campos com * são obrigatórios. Os dados são salvos na API Java.</p>

        <DataState
          status={status}
          error={error}
          onRetry={recarregar}
          loadingLabel="Buscando usuário na API... a primeira requisição pode levar até 1 minuto."
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="bg-bgSecondary border border-borderColor rounded-card p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="md:col-span-2">
              <FormField id="nome" label="Nome completo *" error={errors.nome?.message}>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Ex.: Ana Souza"
                  aria-invalid={!!errors.nome}
                  className={inputClass(!!errors.nome)}
                  {...register("nome", {
                    required: "Informe o nome.",
                    minLength: { value: 3, message: "O nome precisa ter pelo menos 3 caracteres." },
                    maxLength: { value: 100, message: "O nome pode ter no máximo 100 caracteres." },
                    validate: (v) => v.trim().length >= 3 || "O nome não pode ficar em branco.",
                  })}
                />
              </FormField>
            </div>

            <FormField id="email" label="E-mail *" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                aria-invalid={!!errors.email}
                className={inputClass(!!errors.email)}
                {...register("email", {
                  required: "Informe o e-mail.",
                  pattern: { value: EMAIL_REGEX, message: "Digite um e-mail válido." },
                })}
              />
            </FormField>

            <FormField
              id="senha"
              label="Senha *"
              error={errors.senha?.message}
              hint={isEdit ? "Por segurança, digite a senha novamente para salvar." : "Mínimo de 6 caracteres."}
            >
              <input
                id="senha"
                type="password"
                autoComplete={isEdit ? "current-password" : "new-password"}
                aria-invalid={!!errors.senha}
                className={inputClass(!!errors.senha)}
                {...register("senha", {
                  required: "Informe a senha.",
                  minLength: { value: 6, message: "A senha precisa ter pelo menos 6 caracteres." },
                })}
              />
            </FormField>

            <FormField id="idade" label="Idade *" error={errors.idade?.message}>
              <input
                id="idade"
                type="number"
                min={12}
                max={120}
                inputMode="numeric"
                aria-invalid={!!errors.idade}
                className={inputClass(!!errors.idade)}
                {...register("idade", {
                  valueAsNumber: true,
                  required: "Informe a idade.",
                  min: { value: 12, message: "A idade mínima é 12 anos." },
                  max: { value: 120, message: "Digite uma idade válida." },
                  validate: (v) => Number.isInteger(v) || "Use um número inteiro.",
                })}
              />
            </FormField>

            <FormField id="cidade" label="Cidade *" error={errors.cidade?.message}>
              <input
                id="cidade"
                type="text"
                autoComplete="address-level2"
                placeholder="Ex.: São Paulo"
                aria-invalid={!!errors.cidade}
                className={inputClass(!!errors.cidade)}
                {...register("cidade", {
                  required: "Informe a cidade.",
                  validate: (v) => v.trim().length >= 2 || "Informe a cidade.",
                })}
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField id="interesse" label="Principal interesse *" error={errors.interesse?.message}>
                <select
                  id="interesse"
                  className={inputClass(!!errors.interesse)}
                  {...register("interesse", { required: "Escolha um interesse." })}
                >
                  {INTERESSES.map((interesse) => (
                    <option key={interesse} value={interesse}>
                      {interesse}
                    </option>
                  ))}
                </select>
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
                {isSubmitting ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar usuário"}
              </button>
            </div>
          </form>
        </DataState>
      </div>
    </main>
  );
}

export default UsuarioForm;
