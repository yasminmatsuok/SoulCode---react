import { useState } from "react";
import { Link } from "react-router-dom";
import DataState from "../components/DataState";
import PageHero from "../components/PageHero";
import RecompensaCard from "../components/RecompensaCard";
import { useFetch } from "../hooks/useFetch";
import { useSaldo } from "../hooks/useSaldo";
import { ROUTES } from "../routes/paths";
import { listarRecompensas } from "../services/recompensaService";
import type { CategoriaRecompensa, Recompensa } from "../types";
import { formatarPontos } from "../utils/format";
import { inputClass } from "../utils/formStyles";
import { CATEGORIA_LABEL } from "../utils/labels";

type FiltroCategoria = CategoriaRecompensa | "todas";
type Ordenacao = "menor-custo" | "maior-custo" | "nome";

const ORDENAR: Record<Ordenacao, (a: Recompensa, b: Recompensa) => number> = {
  "menor-custo": (a, b) => a.custoPontos - b.custoPontos,
  "maior-custo": (a, b) => b.custoPontos - a.custoPontos,
  nome: (a, b) => a.nome.localeCompare(b.nome),
};

function Recompensas() {
  const { data: recompensas, status, error, recarregar } = useFetch(listarRecompensas);
  const { saldo } = useSaldo();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState<FiltroCategoria>("todas");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("menor-custo");
  const [somenteAlcance, setSomenteAlcance] = useState(false);

  const termo = busca.trim().toLowerCase();
  const visiveis = (recompensas ?? [])
    .filter((r) => categoria === "todas" || r.categoria === categoria)
    .filter((r) => !termo || r.nome.toLowerCase().includes(termo) || r.descricao.toLowerCase().includes(termo))
    .filter((r) => !somenteAlcance || (saldo !== null && r.ativa && r.estoque > 0 && r.custoPontos <= saldo.pontosDisponiveis))
    .sort(ORDENAR[ordenacao]);

  return (
    <main>
      <PageHero
        titulo={
          <>
            Catálogo de <span className="highlight">Recompensas</span>
          </>
        }
        subtitulo="Troque seus pontos por benefícios reais de parceiros sustentáveis"
      >
        <p className="mt-6 inline-flex items-center gap-2 bg-bgSecondary/80 border border-borderColor rounded-pill px-5 py-2 text-sm sm:text-base">
          Seu saldo: <strong className="text-accent">{saldo ? formatarPontos(saldo.pontosDisponiveis) : "..."}</strong>
        </p>
      </PageHero>

      <section className="py-12 md:py-16">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="section-title mb-0">
              Benefícios <span className="highlight">disponíveis</span>
            </h2>
            <Link to={ROUTES.recompensaNova} className="btn-primary self-start md:self-auto">
              + Nova recompensa
            </Link>
          </div>

          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-bgSecondary border border-borderColor rounded-card p-4 sm:p-5"
          >
            <div className="sm:col-span-2 lg:col-span-1">
              <label htmlFor="busca" className="block text-xs text-textSecondary mb-1">
                Buscar
              </label>
              <input
                id="busca"
                type="search"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Nome ou descrição"
                className={inputClass(false)}
              />
            </div>
            <div>
              <label htmlFor="categoria" className="block text-xs text-textSecondary mb-1">
                Categoria
              </label>
              <select
                id="categoria"
                value={categoria}
                onChange={(event) => setCategoria(event.target.value as FiltroCategoria)}
                className={inputClass(false)}
              >
                <option value="todas">Todas</option>
                {(Object.keys(CATEGORIA_LABEL) as CategoriaRecompensa[]).map((valor) => (
                  <option key={valor} value={valor}>
                    {CATEGORIA_LABEL[valor]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="ordenacao" className="block text-xs text-textSecondary mb-1">
                Ordenar por
              </label>
              <select
                id="ordenacao"
                value={ordenacao}
                onChange={(event) => setOrdenacao(event.target.value as Ordenacao)}
                className={inputClass(false)}
              >
                <option value="menor-custo">Menor custo</option>
                <option value="maior-custo">Maior custo</option>
                <option value="nome">Nome (A-Z)</option>
              </select>
            </div>
            <label className="flex items-center gap-3 text-sm cursor-pointer lg:pt-5">
              <input
                type="checkbox"
                checked={somenteAlcance}
                onChange={(event) => setSomenteAlcance(event.target.checked)}
                className="h-5 w-5 accent-brandPrimary"
              />
              Só o que posso resgatar
            </label>
          </form>

          <DataState
            status={status}
            error={error}
            onRetry={recarregar}
            loadingLabel="Carregando recompensas..."
            empty={{
              titulo: "Nenhuma recompensa cadastrada",
              mensagem: "Cadastre a primeira recompensa para os usuários converterem seus pontos.",
              acao: (
                <Link to={ROUTES.recompensaNova} className="btn-primary">
                  Cadastrar recompensa
                </Link>
              ),
            }}
          >
            {visiveis.length === 0 ? (
              <p className="text-center text-textSecondary py-10">Nenhuma recompensa encontrada com esses filtros.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {visiveis.map((recompensa) => (
                  <RecompensaCard
                    key={recompensa.id}
                    recompensa={recompensa}
                    saldoDisponivel={saldo?.pontosDisponiveis ?? null}
                  />
                ))}
              </div>
            )}
          </DataState>
        </div>
      </section>
    </main>
  );
}

export default Recompensas;
