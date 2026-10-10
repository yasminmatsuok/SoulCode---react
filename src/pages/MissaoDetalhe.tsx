import { useCallback, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Loading } from "../components/StatusMessage";
import { useApi } from "../hooks/useApi";
import { deleteMission, getMission } from "../services/missionService";
import type { Difficulty } from "../types";

const badgeLabels: Record<Difficulty, string> = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
};

function MissaoDetalhe() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fetchMission = useCallback(() => getMission(id), [id]);
  const { data: mission, status, error, reload } = useApi(fetchMission);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleDelete() {
    if (!window.confirm("Tem certeza que deseja excluir esta missão?")) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteMission(id);
      navigate("/missoes", { state: { flash: "Missão excluída com sucesso!" } });
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Não foi possível excluir.");
      setDeleting(false);
    }
  }

  if (status === "loading") {
    return (
      <main className="min-h-screen pt-32">
        <Loading message="Carregando missão..." />
      </main>
    );
  }

  if (status === "error" && error?.status === 404) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center pt-32">
        <h1 className="text-2xl font-bold mb-4">Missão não encontrada</h1>
        <p className="text-textSecondary mb-6">
          Não existe uma missão com o código “{id}”.
        </p>
        <Link to="/missoes" className="btn-primary">
          Voltar para Missões
        </Link>
      </main>
    );
  }

  if (status === "error" || !mission) {
    return (
      <main className="min-h-screen pt-32">
        <ErrorMessage message={error?.message} onRetry={reload} />
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 px-8 min-h-screen">
      <div className="container-app max-w-2xl">
        <Link
          to="/missoes"
          className="text-textSecondary hover:text-accent text-sm mb-8 inline-block"
        >
          ← Voltar para todas as missões
        </Link>

        <div className="bg-bgSecondary border border-borderColor rounded-xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="mr-2">{mission.icon}</span>
              {mission.title}
            </h1>
            <span className="text-sm px-3 py-1 rounded-full bg-brandPrimary/20 text-brandPrimary">
              {badgeLabels[mission.difficulty]}
            </span>
          </div>

          <p className="text-textSecondary mb-4">{mission.description}</p>
          <p className="text-textSecondary mb-6">{mission.longDescription}</p>

          <div className="flex items-center justify-between mb-8">
            <span className="text-textSecondary">Pontos</span>
            <span className="font-bold text-lg">{mission.points} pontos</span>
          </div>

          {deleteError && (
            <p role="alert" className="text-red-400 text-sm mb-4">
              {deleteError}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Link to={`/missoes/${mission.id}/editar`} className="btn-primary">
              Editar
            </Link>
            <button onClick={handleDelete} disabled={deleting} className="btn-secondary">
              {deleting ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MissaoDetalhe;
