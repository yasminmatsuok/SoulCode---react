import type { ReactNode } from "react";
import { NETWORK_ERROR_STATUS, type ApiError } from "../services/api";
import type { Status } from "../types";

interface EmptyConfig {
  titulo: string;
  mensagem: string;
  acao?: ReactNode;
}

interface DataStateProps {
  status: Status;
  error: ApiError | null;
  onRetry: () => void;
  loadingLabel: string;
  empty?: EmptyConfig; // telas de detalhe não têm estado vazio
  children: ReactNode;
}

function tituloDoErro(status: number): string {
  if (status === NETWORK_ERROR_STATUS) return "Sem conexão com o servidor";
  if (status === 400) return "Requisição inválida";
  if (status === 404) return "Não encontrado";
  if (status >= 500) return "Erro no servidor";
  return "Algo deu errado";
}

export function Spinner({ label }: { label: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-4 py-16 text-textSecondary">
      <span
        aria-hidden="true"
        className="h-10 w-10 md:h-12 md:w-12 rounded-full border-4 border-borderColor border-t-accent animate-spin"
      />
      <p className="text-sm md:text-base">{label}</p>
    </div>
  );
}

// Mostra loading, erro ou lista vazia; só renderiza `children` quando há dados
function DataState({ status, error, onRetry, loadingLabel, empty, children }: DataStateProps) {
  if (status === "loading") return <Spinner label={loadingLabel} />;

  if (status === "error") {
    return (
      <div
        role="alert"
        className="mx-auto max-w-lg text-center bg-bgSecondary border border-red-400/40 rounded-card px-6 py-10 md:px-10"
      >
        <div className="text-4xl mb-4" aria-hidden="true">
          ⚠️
        </div>
        <h2 className="text-lg md:text-xl font-semibold mb-2">{tituloDoErro(error?.status ?? -1)}</h2>
        <p className="text-textSecondary text-sm md:text-base mb-6">{error?.message}</p>
        <button type="button" onClick={onRetry} className="btn-primary">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (status === "empty" && empty) {
    return (
      <div className="mx-auto max-w-lg text-center bg-bgSecondary border border-borderColor rounded-card px-6 py-10 md:px-10">
        <div className="text-4xl mb-4" aria-hidden="true">
          📭
        </div>
        <h2 className="text-lg md:text-xl font-semibold mb-2">{empty.titulo}</h2>
        <p className="text-textSecondary text-sm md:text-base mb-6">{empty.mensagem}</p>
        {empty.acao}
      </div>
    );
  }

  return <>{children}</>;
}

export default DataState;
