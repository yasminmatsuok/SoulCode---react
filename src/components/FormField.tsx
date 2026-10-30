import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

// Label + campo + mensagem de erro, ligados por id para leitores de tela
function FormField({ id, label, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm text-textSecondary">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-textSecondary/80 text-xs mt-1">{hint}</p>}
      {error && (
        <p id={`${id}-erro`} role="alert" className="text-red-400 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
