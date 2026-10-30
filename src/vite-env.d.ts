/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_USE_MOCK?: string;
  readonly VITE_USUARIO_ID?: string;
  readonly VITE_MOCK_ERROR_RATE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
