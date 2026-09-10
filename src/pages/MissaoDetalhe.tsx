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
        <h1 className="text-2xl font-bold mb-4">Missão não encontrada</h1>
        <button onClick={() => navigate("/missoes")} className="btn-primary">
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
          ← Voltar para Missões
        </button>

        <div className="bg-bgSecondary border border-borderColor rounded-card p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-5xl">{mission.icon}</span>
            <span className="bg-brandPrimary/20 text-brandSecondary rounded-pill px-4 py-1 text-sm font-semibold">
              {badgeLabels[mission.difficulty]}
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-4">{mission.title}</h1>
          <p className="text-textSecondary mb-6">{mission.longDescription}</p>

          <div className="flex justify-between items-center border-t border-borderColor pt-6">
            <span className="text-accent font-bold text-xl">+{mission.points} pts</span>
            <button className="btn-primary">Confirmar Início</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MissaoDetalhe;
