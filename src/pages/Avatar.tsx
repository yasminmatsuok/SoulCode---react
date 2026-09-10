import ChatWidget from "../components/ChatWidget";

const FEATURES = [
  { icon: "🎯", title: "Sugerir Missões", text: "O Soul analisa seu perfil e sugere missões sustentáveis personalizadas para você." },
  { icon: "📊", title: "Acompanhar Progresso", text: "Monitora suas ações e mostra seu evolução em tempo real." },
  { icon: "💡", title: "Dicas Sustentáveis", text: "Oferece dicas personalizadas baseadas no seu comportamento." },
  { icon: "📝", title: "Criar Publicações", text: "Gera conteúdo automaticamente para compartilhar suas conquistas." },
];

function Avatar() {
  return (
    <main>
      <section
        className="min-h-[40vh] flex items-center justify-center text-center px-8 pt-32 pb-16"
        style={{ background: "radial-gradient(ellipse at center, #1a1535 0%, #0A0A0F 70%)" }}
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Seu <span className="highlight">Avatar Inteligente</span>
          </h1>
          <p className="text-textSecondary text-lg">
            Um assistente inteligente personalizado que evolui com suas experiências e auxilia você em cada desafio
          </p>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="container-app grid md:grid-cols-[300px_1fr] gap-8">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto rounded-full bg-bgSecondary border-2 border-brandPrimary flex items-center justify-center mb-4 overflow-hidden">
              <img src="/favicon.png" alt="Avatar Soul" className="w-24 h-24 object-contain" />
            </div>
            <h2 className="text-xl font-bold">Souli</h2>
            <p className="text-accent text-sm mb-4">● Online</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <h3 className="font-bold">Nível 3</h3>
                <p className="text-textSecondary text-xs">Explorador</p>
              </div>
              <div>
                <h3 className="font-bold">450 pts</h3>
                <p className="text-textSecondary text-xs">Pontos</p>
              </div>
              <div>
                <h3 className="font-bold">5</h3>
                <p className="text-textSecondary text-xs">Missões</p>
              </div>
            </div>
          </div>

          <ChatWidget />
        </div>
      </section>

      <section className="py-20 px-8 text-center">
        <div className="container-app">
          <h2 className="section-title">
            O que o <span className="highlight">Soul</span> pode fazer?
          </h2>
          <p className="section-subtitle">Seu avatar está sempre pronto para te ajudar</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-bgSecondary border border-borderColor rounded-card p-8 transition-all hover:-translate-y-1 hover:border-accent"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-textSecondary text-sm">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Avatar;
