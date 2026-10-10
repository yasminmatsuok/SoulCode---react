interface Props {
  onRetry?: () => void;
  message?: string;
}

export function Loading({ message = "Carregando..." }: Props) {
  return (
    <div role="status" className="py-16 text-center text-textSecondary">
      <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-borderColor border-t-accent" />
      {message}
    </div>
  );
}

export function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div role="alert" className="py-16 text-center">
      <p className="mb-4 text-red-400">{message ?? "Algo deu errado."}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary">
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export function EmptyMessage({ message = "Nenhum item encontrado." }: Props) {
  return <p className="py-16 text-center text-textSecondary">{message}</p>;
}
