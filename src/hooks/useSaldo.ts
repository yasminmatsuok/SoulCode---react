import { useContext } from "react";
import { SaldoContext } from "../context/SaldoContext";

export function useSaldo() {
  const context = useContext(SaldoContext);
  if (!context) throw new Error("useSaldo precisa estar dentro de <SaldoProvider>.");
  return context;
}
