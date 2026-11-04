import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../components/Badge";
import ConfirmDialog from "../components/ConfirmDialog";
import DataState, { Spinner } from "../components/DataState";
import { useFetch } from "../hooks/useFetch";
import { useIdParam } from "../hooks/useIdParam";
import { useNotification } from "../hooks/useNotification";
import { useRedirectInvalido } from "../hooks/useRedirectInvalido";
import { buildPath, ROUTES } from "../routes/paths";
import { toApiError } from "../services/api";
import { buscarUsuario, excluirUsuario, listarAvatares } from "../services/usuarioService";
import { formatarPontos } from "../utils/format";

const NAO_INFORMADO = "Não informado";

function UsuarioDetalhe() {
  const { id, idBruto } = useIdParam();
  const navigate = useNavigate();
  const { notificar } = useNotification();
  const [confirmando, setConfirmando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  const fetcher = useCallback(() => (id === null ? Promise.resolve(null) : buscarUsuario(id)), [id]);
  const { data: usuario, status, error, recarregar } = useFetch(fetcher);
  const avatares = useFetch(listarAvatares);
  useRedirectInvalido({ id, idBruto, error, entidade: "Usuário", destino: ROUTES.usuarios, masculino: true });

  const avataresDoUsuario = (avatares.data ?? []).filter((avatar) => avatar.usuarioId === id);

  async function handleExcluir() {
    if (!usuario) return;
    setExcluindo(true);
    try {
      await excluirUsuario(usuario.id);
      notificar("success", `Usuário "${usuario.nome}" excluído com sucesso.`);
      navigate(ROUTES.usuarios);
    } catch (err) {
      notificar("error", toApiError(err).message);
      setExcluindo(false);
      setConfirmando(false);
    }
  }

  if (id === null || error?.status === 404) return <Spinner label="Redirecionando..." />;

  return (
    <main className="pt-28 md:pt-32 pb-16 md:pb-20 min-h-screen">
      <div className="container-app max-w-4xl">
        <Link to={ROUTES.usuarios} className="text-textSecondary hover:text-accent text-sm mb-6 md:mb-8 inline-block rounded">
          ← Voltar para usuários
        </Link>

        <DataState
          status={status}
          error={error}
          onRetry={recarregar}
          loadingLabel="Buscando usuário na API... a primeira requisição pode levar até 1 minuto."
        >
          {usuario && (
            <article className="grid lg:grid-cols-[1fr_320px] gap-6">
              <div className="bg-bgSecondary border border-borderColor rounded-card p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge cor="bg-brandPrimary/20 text-brandSecondary">Usuário #{usuario.id}</Badge>
                  {usuario.interesse && <Badge cor="bg-green-400/20 text-green-300">{usuario.interesse}</Badge>}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1 break-words">{usuario.nome}</h1>
                <p className="text-textSecondary text-sm sm:text-base mb-8 break-all">{usuario.email}</p>

                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-borderColor pt-6 text-sm">
                  <div>
                    <dt className="text-textSecondary">Pontos</dt>
                    <dd className="font-bold text-accent text-lg">{formatarPontos(usuario.pontos)}</dd>
                  </div>
                  <div>
                    <dt className="text-textSecondary">Idade</dt>
                    <dd className="font-bold text-lg">{usuario.idade > 0 ? `${usuario.idade} anos` : NAO_INFORMADO}</dd>
                  </div>
                  <div>
                    <dt className="text-textSecondary">Cidade</dt>
                    <dd className="font-bold text-lg">{usuario.cidade || NAO_INFORMADO}</dd>
                  </div>
                </dl>

                <div className="border-t border-borderColor mt-6 pt-6">
                  <h2 className="font-semibold mb-3">Avatares</h2>
                  {avatares.status === "loading" ? (
                    <p className="text-textSecondary text-sm">Carregando avatares...</p>
                  ) : avataresDoUsuario.length === 0 ? (
                    <p className="text-textSecondary text-sm">Este usuário ainda não criou um avatar.</p>
                  ) : (
                    <ul className="flex flex-wrap gap-3">
                      {avataresDoUsuario.map((avatar) => (
                        <li key={avatar.id} className="flex items-center gap-2 bg-bgPrimary border border-borderColor rounded-pill px-4 py-2 text-sm">
                          <span aria-hidden="true">🤖</span> {avatar.nome}
                          <span className="text-textSecondary">· nível {avatar.nivel}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <aside className="bg-bgSecondary border border-borderColor rounded-card p-6 flex flex-col gap-3 self-start">
                <h2 className="font-semibold">Gerenciar</h2>
                <Link to={buildPath.usuarioEditar(usuario.id)} className="btn-secondary w-full">
                  Editar
                </Link>
                <button type="button" onClick={() => setConfirmando(true)} disabled={excluindo} className="btn-danger w-full">
                  Excluir
                </button>
              </aside>
            </article>
          )}
        </DataState>
      </div>

      <ConfirmDialog
        aberto={confirmando}
        titulo="Excluir usuário?"
        mensagem={`"${usuario?.nome ?? ""}" será removido permanentemente da API.`}
        textoConfirmar="Sim, excluir"
        carregando={excluindo}
        onConfirmar={handleExcluir}
        onCancelar={() => setConfirmando(false)}
      />
    </main>
  );
}

export default UsuarioDetalhe;
