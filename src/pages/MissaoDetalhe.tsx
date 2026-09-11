import { useNavigate, useParams } from "react-router-dom";
import { missions } from "../data/missions";

const badgeLabels = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
};

function MissaoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const mission = missions.find((m) => m.id === id);

  if (!mission) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center pt-32">
        <h1 className="text-2xl font-bold mb-4">
          Missão não encontrada
        </h1>

        <button
          onClick={() => navigate("/missoes")}
          className="btn-primary"
        >
          Voltar para Missões
        </button>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 px-8 min-h-screen">
      <div className="container-app max-w-2xl">
        <button
          onClick={() => navigate("/missoes")}
          className="text-textSecondary hover:text-accent text-sm mb-8 inline-block"
        >
          ← Voltar para todas as missões
        </button>

        <div className="bg-bgSecondary border border-borderColor rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">
              {mission.title}
            </h1>

            <span className="text-sm px-3 py-1 rounded-full bg-brandPrimary/20 text-brandPrimary">
              {badgeLabels[mission.difficulty]}
            </span>
          </div>

          <p className="text-textSecondary mb-6">
            {mission.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-textSecondary">
              Pontos
            </span>

            <span className="font-bold text-lg">
              {mission.points} pontos
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MissaoDetalhe;

