// Leitura centralizada das variáveis do .env (ou das Environment Variables da Vercel)
export const ENV = {
  apiUrl: (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, ""),
  // Vale para missões, recompensas, conversões e saldo, que ainda não têm rotas na API Java.
  // Usuários e avatares sempre usam a API real. Sem a variável, o mock fica ligado para o site nunca quebrar.
  useMock: import.meta.env.VITE_USE_MOCK !== "false",
  usuarioId: Number(import.meta.env.VITE_USUARIO_ID ?? 1),
  mockErrorRate: Number(import.meta.env.VITE_MOCK_ERROR_RATE ?? 0),
  // O plano gratuito do Render "dorme" e pode levar quase 1 minuto para responder na primeira requisição
  requestTimeoutMs: 60000,
} as const;
