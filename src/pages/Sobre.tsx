import PageHero from "../components/PageHero";

const TECHS = [
  { icon: "⚛️", title: "React + Vite", text: "SPA rápida com componentes reutilizáveis" },
  { icon: "🔷", title: "TypeScript", text: "Tipos, interfaces, union e intersection types" },
  { icon: "🎨", title: "Tailwind CSS", text: "Estilização utilitária e responsiva" },
  { icon: "🧭", title: "React Router", text: "Rotas estáticas, dinâmicas e redirecionamentos" },
  { icon: "☕", title: "Java + Quarkus", text: "API RESTful com as regras de negócio" },
  { icon: "🗄️", title: "Oracle DB", text: "Banco de dados relacional" },
];

const ROADMAP = [
  {
    number: "01",
    title: "Sprint 1 e 2",
    text: "Levantamento de requisitos, modelagem do banco de dados, desenvolvimento do front-end e chatbot.",
  },
  {
    number: "02",
    title: "Sprint 3",
    text: "Migração do front-end para React + TypeScript, backend e evolução do avatar inteligente.",
  },
  {
    number: "03",
    title: "Sprint 4",
    text: "Conversão de pontos em recompensas, integração com a API Java, deploy na Vercel e apresentação.",
  },
];

function Sobre() {
  return (
    <main>
      <PageHero
        titulo={
          <>
            Sobre o <span className="highlight">Projeto</span>
          </>
        }
        subtitulo="Entenda o contexto, a solução e as tecnologias por trás do SoulCode"
      />

      <section className="py-16 md:py-20 bg-bgSecondary">
        <div className="container-app grid md:grid-cols-2 gap-10 lg:gap-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              O <span className="highlight">Problema</span>
            </h2>
            <p className="text-textSecondary mb-4">
              A SoulUp é uma plataforma social focada em engajamento e impacto positivo. Com o crescimento da plataforma
              e a diversidade de funcionalidades, surge a necessidade de guiar o usuário de forma mais personalizada e
              proativa.
            </p>
            <p className="text-textSecondary">
              Os usuários precisam de orientação para realizar ações sustentáveis e de um incentivo claro: ver seus
              pontos virarem benefícios concretos.
            </p>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              A <span className="highlight">Solução</span>
            </h2>
            <p className="text-textSecondary mb-4">
              O Avatar Inteligente acompanha o usuário, sugere missões sustentáveis e registra os pontos de cada ação
              concluída.
            </p>
            <p className="text-textSecondary">
              Esses pontos podem ser convertidos em recompensas de parceiros, como descontos na conta de energia e
              créditos de transporte, com histórico completo de cada conversão.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 text-center">
        <div className="container-app">
          <h2 className="section-title">
            Tecnologias <span className="highlight">Utilizadas</span>
          </h2>
          <p className="section-subtitle">As ferramentas que usamos para construir essa solução</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {TECHS.map((tech) => (
              <div
                key={tech.title}
                className="bg-bgSecondary border border-borderColor rounded-card p-6 md:p-8 transition-all hover:-translate-y-1 hover:border-accent"
              >
                <div className="text-4xl mb-4" aria-hidden="true">
                  {tech.icon}
                </div>
                <h3 className="font-semibold mb-2">{tech.title}</h3>
                <p className="text-textSecondary text-sm">{tech.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bgSecondary text-center">
        <div className="container-app">
          <h2 className="section-title">
            Road<span className="highlight">map</span>
          </h2>
          <p className="section-subtitle">As etapas do nosso desenvolvimento</p>
          <ol className="grid md:grid-cols-3 gap-4 md:gap-8 list-none">
            {ROADMAP.map((item) => (
              <li
                key={item.number}
                className="bg-bgPrimary border border-borderColor rounded-card p-6 md:p-8 transition-colors hover:border-brandPrimary"
              >
                <div className="text-3xl md:text-4xl font-bold text-brandSecondary mb-4">{item.number}</div>
                <h3 className="font-semibold mb-3">{item.title}</h3>
                <p className="text-textSecondary text-sm">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

export default Sobre;
