import type { FaqEntry } from "../types";

interface FaqAccordionItemProps {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqAccordionItem({ entry, isOpen, onToggle }: FaqAccordionItemProps) {
  const respostaId = `faq-${entry.id}`;

  return (
    <div className="bg-bgSecondary border border-borderColor rounded-card overflow-hidden">
      <h2>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={respostaId}
          className="w-full flex justify-between items-center gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-medium text-textPrimary rounded-card"
        >
          {entry.question}
          <span aria-hidden="true" className={`text-xl text-accent transition-transform ${isOpen ? "rotate-45" : ""}`}>
            +
          </span>
        </button>
      </h2>
      <div
        id={respostaId}
        role="region"
        hidden={!isOpen}
        className="px-5 sm:px-6 pb-5 text-textSecondary text-sm sm:text-base"
      >
        <p>{entry.answer}</p>
      </div>
    </div>
  );
}

export default FaqAccordionItem;
