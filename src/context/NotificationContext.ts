import { createContext } from "react";
import type { Toast, ToastType } from "../types";

export interface NotificationContextValue {
  toasts: Toast[];
  notificar: (type: ToastType, message: string) => void;
  fechar: (id: number) => void;
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);
