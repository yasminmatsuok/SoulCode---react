import { useState } from "react";
import { Link } from "react-router-dom";
import DataState from "../components/DataState";
import MissaoCard from "../components/MissaoCard";
import PageHero from "../components/PageHero";
import StatCard from "../components/StatCard";
import { useFetch } from "../hooks/useFetch";
import { useSaldo } from "../hooks/useSaldo";
import { ROUTES } from "../routes/paths";
import { listarMissoes } from "../services/missaoService";
import type { Dificuldade } from "../types";
import { formatarPontos } from "../utils/format";
import { DIFICULDADE_LABEL } from "../utils/labels";

type Filtro = Dificuldade | "todas";

const FILTROS: { label: string; value: Filtro }[] = [
  { label: "Todas", value: "todas" },
  ...(Object.keys(DIFICULDADE_LABEL) as Dificuldade[]).map((value) => ({ label: DIFICULDADE_LABEL[value], value })),
];

function Missoes() {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const { data: missoes, status, error, recarregar } = useFetch(listarMissoes);
  const { saldo } = useSaldo();

  const filtradas = (missoes ?? []).filter((missao) => filtro === "todas" || missao.dificuldade === filtro);

  return (
    <main>
      <PageHero
        titulo={
          <>
            Missões <span className="highlight">Sustentáveis</span>
          </>
        }
        subtitulo="Complete missões, acumule pontos e converta em recompensas reais"
      />

      <section aria-label="Seu progresso" className="py-10 md:py-12 bg-bgSecondary">
        <div className="container-app grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <StatCard valor={saldo ? formatarPontos(saldo.pontosDisponiveis) : "..."} label="Pontos disponíveis" />
          <StatCard valor={saldo ? formatarPontos(saldo.pontosAcumulados) : "..."} label="Pontos acumulados" />
          <StatCard valor={missoes ? String(missoes.length) : "..."} label="Missões disponíveis" />
          <StatCard valor={saldo ? `Nível ${saldo.nivel.numero}` : "..."} label={saldo?.nivel.nome ?? "Nível"} />
        </div>
      </section>

      <section className="py-14 md:py-20 text-center">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:text-left">
            <div>
              <h2 className="section-title">
                Missões <span className="highlight">Disponíveis</span>
              </h2>
              <p className="text-textSecondary">Escolha uma missão e comece a fazer a diferença</p>
            </div>
            <Link to={ROUTES.missaoNova} className="btn-primary self-center md:self-auto">
              + Nova missão
            </Link>
          </div>

          <div role="group" aria-label="Filtrar por dificuldade" className="flex gap-2 sm:gap-4 justify-center md:justify-start flex-wrap mb-8">
            {FILTROS.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={filtro === f.value}
                onClick={() => setFiltro(f.value)}
                className={`rounded-pill px-4 sm:px-6 py-2 text-sm transition-all border ${
                  filtro === f.value
                    ? "bg-brandPrimary text-textPrimary border-brandPrimary"
                    : "bg-bgSecondary text-textSecondary border-borderColor hover:bg-brandPrimary hover:text-textPrimary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <DataState
            status={status}
            error={error}
            onRetry={recarregar}
            loadingLabel="Carregando missões..."
            empty={{
              titulo: "Nenhuma missão cadastrada",
              mensagem: "Cadastre a primeira missão para os usuários começarem a pontuar.",
              acao: (
                <Link to={ROUTES.missaoNova} className="btn-primary">
                  Cadastrar missão
                </Link>
              ),
            }}
          >
            {filtradas.length === 0 ? (
              <p className="text-textSecondary py-10">Nenhuma missão com essa dificuldade.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filtradas.map((missao) => (
                  <MissaoCard key={missao.id} missao={missao} />
                ))}
              </div>
            )}
          </DataState>
        </div>
      </section>
    </main>
  );
}

export default Missoes;
