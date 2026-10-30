// Leitura centralizada das variáveis do .env (ou das Environment Variables da Vercel)
export const ENV = {
  apiUrl: (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, ""),
  // Sem a variável, o mock fica ligado para o site nunca quebrar
  useMock: import.meta.env.VITE_USE_MOCK !== "false",
  usuarioId: Number(import.meta.env.VITE_USUARIO_ID ?? 1),
  mockErrorRate: Number(import.meta.env.VITE_MOCK_ERROR_RATE ?? 0),
  requestTimeoutMs: 10000,
} as const;
