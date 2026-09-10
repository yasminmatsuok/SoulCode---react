import { useState } from "react";
import MissionCard from "../components/MissionCard";
import { missions } from "../data/missions";
import type { Difficulty } from "../types";

type FilterValue = Difficulty | "todas";

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "Todas", value: "todas" },
  { label: "Fácil", value: "facil" },
  { label: "Médio", value: "medio" },
  { label: "Difícil", value: "dificil" },
];

const PROGRESS = [
  { value: "450", label: "Pontos Acumulados" },
  { value: "5", label: "Missões Completas" },
  { value: "3", label: "Missões Pendentes" },
  { value: "Nível 3", label: "Explorador" },
];

function Missoes() {
  const [filter, setFilter] = useState<FilterValue>("todas");

  const filteredMissions =
    filter === "todas" ? missions : missions.filter((m) => m.difficulty === filter);

  return (
    <main>
      <section
        className="min-h-[40vh] flex items-center justify-center text-center px-8 pt-32 pb-16"
        style={{ background: "radial-gradient(ellipse at center, #1a1535 0%, #0A0A0F 70%)" }}
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Missões <span className="highlight">Sustentáveis</span>
          </h1>
          <p className="text-textSecondary text-lg">
            Complete missões, acumule pontos e gere impacto positivo no planeta
          </p>
        </div>
      </section>

      <section className="py-12 px-8 bg-bgSecondary">
        <div className="container-app grid grid-cols-2 md:grid-cols-4 gap-6">
          {PROGRESS.map((p) => (
            <div
              key={p.label}
              className="bg-bgPrimary border border-borderColor rounded-card p-6 text-center transition-colors hover:border-accent"
            >
              <h3 className="text-2xl font-bold text-accent mb-2">{p.value}</h3>
              <p className="text-textSecondary text-sm">{p.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-8 text-center">
        <div className="container-app">
          <h2 className="section-title">
            Missões <span className="highlight">Disponíveis</span>
          </h2>
          <p className="section-subtitle">Escolha uma missão e comece a fazer a diferença</p>

          <div className="flex gap-4 justify-center flex-wrap mb-8">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-pill px-6 py-2 text-sm transition-all border ${
                  filter === f.value
                    ? "bg-brandPrimary text-textPrimary border-brandPrimary"
                    : "bg-bgSecondary text-textSecondary border-borderColor hover:bg-brandPrimary hover:text-textPrimary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Missoes;
