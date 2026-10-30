import { Link } from "react-router-dom";
import { useSaldo } from "../hooks/useSaldo";
import { ROUTES } from "../routes/paths";
import { formatarPontos } from "../utils/format";

const PASSOS = [
  {
    icon: "🌱",
    title: "1. Complete missões",
    text: "Realize ações sustentáveis sugeridas pelo Avatar, como usar transporte público ou reciclar.",
  },
  {
    icon: "💰",
    title: "2. Acumule pontos",
    text: "Cada missão concluída soma pontos ao seu saldo e faz você subir de nível.",
  },
  {
    icon: "🎁",
    title: "3. Converta em recompensas",
    text: "Troque seus pontos por descontos na conta de luz, créditos de transporte e muito mais.",
  },
];

const STATS = [
  { value: "67.108", label: "Usuários" },
  { value: "183.057", label: "Eventos" },
  { value: "9.599", label: "Usuários Ativos" },
  { value: "15.572", label: "Sessões" },
];

function Home() {
  const { saldo } = useSaldo();

  return (
    <main>
      <section className="bg-hero min-h-[90vh] md:min-h-screen flex items-center justify-center text-center px-4 sm:px-8 pt-28 pb-12">
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            Transforme ações sustentáveis em <span className="highlight">recompensas reais</span>
          </h1>
          <p className="text-textSecondary text-base sm:text-lg md:text-xl mb-8">
            Com o Avatar Inteligente da SoulUp você completa missões, acumula pontos e converte em benefícios.
          </p>
          {saldo && (
            <p className="mb-8 inline-flex items-center gap-2 bg-bgSecondary/80 border border-borderColor rounded-pill px-5 py-2 text-sm sm:text-base">
              <span aria-hidden="true">💰</span> Você tem <strong className="text-accent">{formatarPontos(saldo.pontosDisponiveis)}</strong>
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to={ROUTES.converter} className="btn-primary">
              Converter pontos
            </Link>
            <Link to={ROUTES.recompensas} className="btn-secondary">
              Ver recompensas
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-bgSecondary text-center">
        <div className="container-app">
          <h2 className="section-title">
            Como <span className="highlight">Funciona</span>
          </h2>
          <p className="section-subtitle">Três passos para seu impacto virar benefício</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {PASSOS.map((passo) => (
              <div
                key={passo.title}
                className="bg-bgPrimary border border-borderColor rounded-card p-6 md:p-8 transition-all hover:-translate-y-1 hover:border-accent"
              >
                <div className="text-4xl md:text-5xl mb-4" aria-hidden="true">
                  {passo.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{passo.title}</h3>
                <p className="text-textSecondary text-sm">{passo.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-app grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
          <div>
            <h2 className="section-title">
              Sobre a <span className="highlight">SoulUp</span>
            </h2>
            <p className="text-textSecondary mb-4">
              A SoulUp é uma plataforma digital inovadora que transforma interações online em benefícios reais para os
              usuários e impacto positivo para o planeta.
            </p>
            <p className="text-textSecondary mb-6">
              Por meio do nosso Avatar Inteligente, os usuários recebem orientações personalizadas, completam missões
              sustentáveis e acumulam pontos que podem ser convertidos em vantagens reais.
            </p>
            <Link to={ROUTES.sobre} className="btn-primary">
              Saiba Mais
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-bgSecondary border border-borderColor rounded-card p-4 sm:p-6 text-center transition-colors hover:border-brandPrimary"
              >
                <p className="text-xl sm:text-2xl xl:text-3xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-textSecondary text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hero py-16 md:py-20 text-center">
        <div className="container-app">
          <h2 className="section-title">
            Pronto para conhecer seu <span className="highlight">Avatar</span>?
          </h2>
          <p className="text-textSecondary text-base md:text-lg mb-8">
            Comece agora e transforme suas ações em impacto real para o planeta.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to={ROUTES.avatar} className="btn-primary">
              Conhecer o Avatar
            </Link>
            <Link to={ROUTES.missoes} className="btn-secondary">
              Ver Missões
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
