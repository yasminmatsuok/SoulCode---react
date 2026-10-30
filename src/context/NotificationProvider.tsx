import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import Toaster from "../components/Toaster";
import type { Toast, ToastType } from "../types";
import { NotificationContext } from "./NotificationContext";

const DURACAO_MS = 4500;

interface NotificationProviderProps {
  children: ReactNode;
}

function NotificationProvider({ children }: NotificationProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const proximoId = useRef(1);

  const fechar = useCallback((id: number) => {
    setToasts((atuais) => atuais.filter((toast) => toast.id !== id));
  }, []);

  const notificar = useCallback(
    (type: ToastType, message: string) => {
      const id = proximoId.current++;
      setToasts((atuais) => [...atuais, { id, type, message }]);
      setTimeout(() => fechar(id), DURACAO_MS);
    },
    [fechar],
  );

  const value = useMemo(() => ({ toasts, notificar, fechar }), [toasts, notificar, fechar]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} onClose={fechar} />
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
