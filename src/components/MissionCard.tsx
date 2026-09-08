import { useNavigate } from "react-router-dom";
import type { Mission } from "../types";

const badgeStyles: Record<Mission["difficulty"], string> = {
  facil: "bg-green-400/20 text-green-400",
  medio: "bg-amber-400/20 text-amber-400",
  dificil: "bg-red-400/20 text-red-400",
};

const badgeLabels: Record<Mission["difficulty"], string> = {
  facil: "Fácil",
  medio: "Médio",
  dificil: "Difícil",
};

interface MissionCardProps {
  mission: Mission;
}

function MissionCard({ mission }: MissionCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-bgSecondary border border-borderColor rounded-card p-6 text-left transition-all hover:-translate-y-1 hover:border-brandPrimary">
      <div className="flex justify-between items-center mb-4">
        <span className="text-3xl">{mission.icon}</span>
        <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${badgeStyles[mission.difficulty]}`}>
          {badgeLabels[mission.difficulty]}
        </span>
      </div>
      <h3 className="text-base font-semibold mb-2">{mission.title}</h3>
      <p className="text-textSecondary text-sm mb-6">{mission.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-accent font-bold">+{mission.points} pts</span>
        <button
          onClick={() => navigate(`/missoes/${mission.id}`)}
          className="bg-brandPrimary text-textPrimary rounded-pill px-5 py-2 font-semibold text-sm transition-colors hover:bg-brandSecondary"
        >
          Iniciar
        </button>
      </div>
    </div>
  );
}

export default MissionCard;
