import { useState } from "react";
import FaqAccordionItem from "../components/FaqAccordionItem";
import { faqEntries } from "../data/faq";

function Faq() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <main>
      <section
        className="min-h-[40vh] flex items-center justify-center text-center px-8 pt-32 pb-16"
        style={{ background: "radial-gradient(ellipse at center, #1a1535 0%, #0A0A0F 70%)" }}
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Perguntas <span className="highlight">Frequentes</span>
          </h1>
          <p className="text-textSecondary text-lg">Tire suas dúvidas sobre o Avatar Inteligente da SoulUp</p>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqEntries.map((entry) => (
            <FaqAccordionItem
              key={entry.id}
              entry={entry}
              isOpen={activeId === entry.id}
              onToggle={() => setActiveId((prev) => (prev === entry.id ? null : entry.id))}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Faq;
