import ChatWidget from "../components/ChatWidget";
import PageHero from "../components/PageHero";
import { useSaldo } from "../hooks/useSaldo";

const FEATURES = [
  {
    icon: "🎯",
    title: "Sugerir Missões",
    text: "O Soul analisa seu perfil e sugere missões sustentáveis personalizadas para você.",
  },
  {
    icon: "📊",
    title: "Acompanhar Progresso",
    text: "Monitora suas ações e mostra sua evolução em tempo real, com base no seu histórico.",
  },
  {
    icon: "💡",
    title: "Dicas Sustentáveis",
    text: "Oferece dicas personalizadas e práticas, baseadas no seu histórico de ações.",
  },
  {
    icon: "📝",
    title: "Criar Publicações",
    text: "Gera conteúdo automaticamente para compartilhar suas conquistas.",
  },
];

function Avatar() {
  const { saldo } = useSaldo();

  const stats = [
    { valor: saldo ? `Nível ${saldo.nivel.numero}` : "...", label: saldo?.nivel.nome ?? "Nível" },
    { valor: saldo ? `${saldo.pontosDisponiveis}` : "...", label: "Pontos" },
    { valor: saldo ? `${saldo.pontosConvertidos}` : "...", label: "Convertidos" },
  ];

  return (
    <main>
      <PageHero
        titulo={
          <>
            Seu <span className="highlight">Avatar Inteligente</span>
          </>
        }
        subtitulo="Um assistente inteligente que aprende com você e te ajuda a construir hábitos mais sustentáveis."
      />

      <section className="py-14 md:py-20">
        <div className="container-app grid lg:grid-cols-[300px_1fr] gap-8">
          <div className="text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-bgSecondary border-2 border-brandPrimary flex items-center justify-center mb-4 overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="Ilustração do Soul, o avatar da SoulUp" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
            </div>
            <h2 className="text-xl font-bold">Soul</h2>
            <p className="text-accent text-sm mb-4">● Online</p>
            <dl className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-textSecondary text-xs">{stat.label}</dt>
                  <dd className="font-bold">{stat.valor}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ChatWidget saldo={saldo} />
        </div>
      </section>

      <section className="py-14 md:py-20 text-center">
        <div className="container-app">
          <h2 className="section-title">
            O que o <span className="highlight">Soul</span> pode fazer?
          </h2>
          <p className="section-subtitle">Seu avatar está sempre pronto para te ajudar</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-bgSecondary border border-borderColor rounded-card p-6 md:p-8 transition-all hover:-translate-y-1 hover:border-accent"
              >
                <div className="text-4xl mb-4" aria-hidden="true">
                  {f.icon}
                </div>
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
