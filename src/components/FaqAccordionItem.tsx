import type { FaqEntry } from "../types";

interface FaqAccordionItemProps {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqAccordionItem({ entry, isOpen, onToggle }: FaqAccordionItemProps) {
  return (
    <div className="bg-bgSecondary border border-borderColor rounded-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left px-6 py-5 font-medium bg-transparent border-none cursor-pointer text-textPrimary"
      >
        {entry.question}
        <span className={`text-xl transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
      </button>
      <div
        className={`px-6 text-textSecondary text-sm transition-all overflow-hidden ${
          isOpen ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p>{entry.answer}</p>
      </div>
    </div>
  );
}

export default FaqAccordionItem;
