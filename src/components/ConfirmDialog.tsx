import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  aberto: boolean;
  titulo: string;
  mensagem: string;
  textoConfirmar: string;
  carregando?: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}

// Modal de confirmação para ações destrutivas (excluir, cancelar)
function ConfirmDialog({
  aberto,
  titulo,
  mensagem,
  textoConfirmar,
  carregando = false,
  onConfirmar,
  onCancelar,
}: ConfirmDialogProps) {
  const cancelarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    cancelarRef.current?.focus();
    const fecharComEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !carregando) onCancelar();
    };
    window.addEventListener("keydown", fecharComEsc);
    return () => window.removeEventListener("keydown", fecharComEsc);
  }, [aberto, carregando, onCancelar]);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" onClick={carregando ? undefined : onCancelar} />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-titulo"
        aria-describedby="confirm-mensagem"
        className="relative w-full max-w-md bg-bgSecondary border border-borderColor rounded-card p-6 sm:p-8 animate-slide-in"
      >
        <h2 id="confirm-titulo" className="text-lg sm:text-xl font-bold mb-3">
          {titulo}
        </h2>
        <p id="confirm-mensagem" className="text-textSecondary text-sm sm:text-base mb-6">
          {mensagem}
        </p>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button ref={cancelarRef} type="button" onClick={onCancelar} disabled={carregando} className="btn-secondary">
            Voltar
          </button>
          <button type="button" onClick={onConfirmar} disabled={carregando} className="btn-danger">
            {carregando ? "Aguarde..." : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
