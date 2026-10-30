import { useState } from "react";
import { Link } from "react-router-dom";
import FaqAccordionItem from "../components/FaqAccordionItem";
import PageHero from "../components/PageHero";
import { faqEntries } from "../data/faq";
import { ROUTES } from "../routes/paths";

function Faq() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <main>
      <PageHero
        titulo={
          <>
            Perguntas <span className="highlight">Frequentes</span>
          </>
        }
        subtitulo="Tire suas dúvidas sobre o Avatar Inteligente, os pontos e as recompensas"
      />

      <section className="py-14 md:py-20 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-3 sm:gap-4">
          {faqEntries.map((entry) => (
            <FaqAccordionItem
              key={entry.id}
              entry={entry}
              isOpen={activeId === entry.id}
              onToggle={() => setActiveId((prev) => (prev === entry.id ? null : entry.id))}
            />
          ))}
          <p className="text-center text-textSecondary mt-8">
            Não achou sua resposta?{" "}
            <Link to={ROUTES.contato} className="text-accent hover:underline rounded">
              Fale com a gente
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Faq;
