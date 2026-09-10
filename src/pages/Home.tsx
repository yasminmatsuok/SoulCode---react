import { Link } from "react-router-dom";

const CARDS = [
  {
    icon: "🤖",
    title: "Avatar Personalizado",
    text: "O avatar aprende seu comportamento e adapta suas sugestões de acordo com seu perfil.",
  },
  {
    icon: "🌱",
    title: "Ações Sustentáveis",
    text: "Receba sugestões de ações que geram impacto positivo no meio ambiente.",
  },
  {
    icon: "🏆",
    title: "Recompensas Reais",
    text: "Complete missões e acumule pontos que podem ser trocados por benefícios reais.",
  },
];

const STATS = [
  { value: "61.242", label: "Usuários" },
  { value: "183.057", label: "Eventos" },
  { value: "9.599", label: "Usuários Ativos" },
  { value: "15.572", label: "Sessões" },
];

function Home() {
  return (
    <main>
      <section
        className="min-h-screen flex items-center justify-center text-center px-8 pt-24 pb-8"
        style={{ background: "radial-gradient(ellipse at center, #1a1535 0%, #0A0A0F 70%)" }}
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Conheça o <span className="highlight">Avatar Inteligente</span> da SoulUp
          </h1>
          <p className="text-textSecondary text-lg mb-8">
            Uma experiência personalizada que transforma suas ações sustentáveis em recompensas reais.
          </p>
          <Link to="/avatar" className="btn-primary">
            Conhecer o Avatar
          </Link>
        </div>
      </section>

      <section className="py-20 px-8 bg-bgSecondary text-center">
        <div className="container-app">
          <h2 className="section-title">
            Como <span className="highlight">Funciona</span>
          </h2>
          <p className="section-subtitle">O Avatar Inteligente aprende com você e te guia em cada passo</p>
          <div className="flex gap-8 justify-center flex-wrap">
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-bgPrimary border border-borderColor rounded-card p-8 w-full sm:w-72 transition-all hover:-translate-y-1 hover:border-accent"
              >
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                <p className="text-textSecondary text-sm">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="container-app flex items-center gap-16 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <h2 className="section-title">
              Sobre a <span className="highlight">SoulUp</span>
            </h2>
            <p className="text-textSecondary mb-4">
              A SoulUp é uma plataforma digital inovadora que transforma interações online em benefícios reais
              para os usuários e impacto positivo para o planeta.
            </p>
            <p className="text-textSecondary mb-4">
              Por meio do nosso Avatar Inteligente, os usuários recebem orientações personalizadas, completam
              missões sustentáveis e acumulam pontos que podem ser convertidos em vantagens reais.
            </p>
            <Link to="/sobre" className="btn-primary mt-4 inline-block">
              Saiba Mais
            </Link>
          </div>
          <div className="flex-1 min-w-[300px] grid grid-cols-2 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-bgSecondary border border-borderColor rounded-card p-6 text-center transition-colors hover:border-brandPrimary"
              >
                <h3 className="text-2xl font-bold text-accent mb-2">{stat.value}</h3>
                <p className="text-textSecondary text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 px-8 text-center"
        style={{ background: "radial-gradient(ellipse at center, #1a1535 0%, #0A0A0F 70%)" }}
      >
        <div className="container-app">
          <h2 className="section-title">
            Pronto para conhecer seu <span className="highlight">Avatar</span>?
          </h2>
          <p className="text-textSecondary text-lg mb-8">
            Comece agora e transforme suas ações em impacto real para o planeta.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/avatar" className="btn-primary">
              Conhecer o Avatar
            </Link>
            <Link to="/missoes" className="btn-secondary">
              Ver Missões
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
