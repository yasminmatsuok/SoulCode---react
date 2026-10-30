import type { Toast, ToastType } from "../types";

const ESTILOS: Record<ToastType, { classe: string; icone: string }> = {
  success: { classe: "border-green-400/60 bg-green-950/90", icone: "✅" },
  error: { classe: "border-red-400/60 bg-red-950/90", icone: "⚠️" },
  info: { classe: "border-accent/60 bg-bgSecondary/95", icone: "ℹ️" },
};

interface ToasterProps {
  toasts: Toast[];
  onClose: (id: number) => void;
}

function Toaster({ toasts, onClose }: ToasterProps) {
  return (
    <div
      aria-live="polite"
      className="fixed z-[60] top-20 inset-x-4 sm:inset-x-auto sm:right-6 sm:w-96 flex flex-col gap-3 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.type === "error" ? "alert" : "status"}
          className={`pointer-events-auto flex items-start gap-3 rounded-card border px-4 py-3 shadow-lg shadow-black/40 animate-slide-in ${ESTILOS[toast.type].classe}`}
        >
          <span aria-hidden="true">{ESTILOS[toast.type].icone}</span>
          <p className="flex-1 text-sm">{toast.message}</p>
          <button
            type="button"
            onClick={() => onClose(toast.id)}
            aria-label="Fechar notificação"
            className="text-textSecondary hover:text-textPrimary text-lg leading-none rounded"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toaster;
