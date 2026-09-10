const TECHS = [
  { icon: "🌐", title: "HTML5", text: "Estrutura semântica e organizada" },
  { icon: "🎨", title: "CSS3", text: "Estilização moderna e responsiva" },
  { icon: "⚡", title: "JavaScript", text: "Interatividade e dinamismo" },
  { icon: "🐍", title: "Python", text: "Lógica e automações do sistema" },
  { icon: "☕", title: "Java", text: "Backend e regras de negócio" },
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
    text: "Desenvolvimento do backend, integração com o banco de dados e evolução do avatar inteligente.",
  },
  {
    number: "03",
    title: "Sprint 4",
    text: "Testes, ajustes finais, integração completa e apresentação para a banca avaliadora.",
  },
];

function Sobre() {
  return (
    <main>
      <section
        className="min-h-[40vh] flex items-center justify-center text-center px-8 pt-32 pb-16"
        style={{ background: "radial-gradient(ellipse at center, #1a1535 0%, #0A0A0F 70%)" }}
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Sobre o <span className="highlight">Projeto</span>
          </h1>
          <p className="text-textSecondary text-lg">Entenda o contexto, a solução e as tecnologias por trás do SoulCode</p>
        </div>
      </section>

      <section className="py-20 px-8 bg-bgSecondary">
        <div className="container-app grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">
              O <span className="highlight">Problema</span>
            </h2>
            <p className="text-textSecondary mb-4">
              A SoulUp é uma plataforma social focada em engajamento e impacto positivo. Com o crescimento da
              plataforma e a diversidade de funcionalidades, surge a necessidade de guiar o usuário de forma mais
              personalizada e proativa.
            </p>
            <p className="text-textSecondary mb-4">
              Os usuários precisam de orientação para realizar ações sustentáveis e completar missões dentro da
              plataforma de forma mais eficiente e engajante.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">
              A <span className="highlight">Solução</span>
            </h2>
            <p className="text-textSecondary mb-4">
              O Avatar Inteligente é um assistente personalizado que acompanha o comportamento do usuário, sugere
              ações sustentáveis, auxilia no cumprimento de missões e automatiza interações.
            </p>
            <p className="text-textSecondary mb-4">
              Tornando a jornada mais fluida, engajadora e com impacto positivo real no meio ambiente.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 text-center">
        <div className="container-app">
          <h2 className="section-title">
            Tecnologias <span className="highlight">Utilizadas</span>
          </h2>
          <p className="section-subtitle">As ferramentas que usamos para construir essa solução</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {TECHS.map((tech) => (
              <div
                key={tech.title}
                className="bg-bgSecondary border border-borderColor rounded-card p-8 transition-all hover:-translate-y-1 hover:border-accent"
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="font-semibold mb-2">{tech.title}</h3>
                <p className="text-textSecondary text-sm">{tech.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-bgSecondary text-center">
        <div className="container-app">
          <h2 className="section-title">
            Road<span className="highlight">map</span>
          </h2>
          <p className="section-subtitle">As etapas do nosso desenvolvimento</p>
          <div className="grid md:grid-cols-3 gap-8">
            {ROADMAP.map((item) => (
              <div
                key={item.number}
                className="bg-bgPrimary border border-borderColor rounded-card p-8 transition-colors hover:border-brandPrimary"
              >
                <div className="text-4xl font-bold text-brandPrimary mb-4">{item.number}</div>
                <h3 className="font-semibold mb-3">{item.title}</h3>
                <p className="text-textSecondary text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Sobre;
