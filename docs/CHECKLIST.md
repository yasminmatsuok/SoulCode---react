# Checklist da Sprint 4

Legenda: ✅ pronto · 🙋 depende de você/grupo · ☕ depende da API Java

## Stack e proibições

| Requisito | Status | Onde |
|---|---|---|
| React + Vite + TypeScript | ✅ | `package.json`, `vite.config.ts` |
| `react-router-dom` | ✅ | `src/routes/` |
| Estilização só com Tailwind (sem CSS manual/inline) | ✅ | `tailwind.config.js`, `src/index.css` só tem `@apply` |
| Sem Bootstrap/MUI/Chakra/jQuery/Axios | ✅ | só `fetch` em `src/services/api.ts` |
| Dependências novas | ✅ | nenhuma adicionada (React Hook Form já existia na Sprint 3) |

## Páginas

| Requisito | Status |
|---|---|
| Home, Integrantes, Sobre, FAQ, Contato | ✅ |
| 404 personalizada | ✅ `src/pages/NotFound.tsx` |
| ≥ 2 páginas da solução no menu | ✅ Missões, Recompensas, Converter, Histórico |
| Integrantes com nome, foto, RM, turma, GitHub e LinkedIn | ✅ `src/data/team.ts` |

## Rotas

| Requisito | Status |
|---|---|
| Rotas centralizadas e tipadas em `src/routes/` | ✅ `paths.ts`, `AppRoutes.tsx`, `navigation.ts` |
| Rotas dinâmicas com `useParams` buscando pelo service | ✅ `/missoes/:id`, `/recompensas/:id` (+ `/editar`) |
| Redirecionamento com feedback após criar/editar/excluir | ✅ toasts |
| Id inválido/inexistente com mensagem personalizada | ✅ `useRedirectInvalido` |
| Rota inexistente → 404 | ✅ |
| Menu hambúrguer no mobile | ✅ |

## TypeScript

| Requisito | Status | Exemplo |
|---|---|---|
| Tipos básicos | ✅ | `src/types/*` |
| Union Types | ✅ | `Status`, `Dificuldade`, `StatusConversao`, `HttpMethod` |
| Intersection Types | ✅ | `Recompensa = NovaRecompensa & { id; criadaEm }` |
| Interfaces para entidades e props | ✅ | todos os componentes |
| Sem `any`, strict ativo | ✅ | `tsconfig.app.json` |

## Integração com API

| Requisito | Status |
|---|---|
| GET listagem / GET detalhe | ✅ (mock) · ☕ (real) |
| POST, PUT, PATCH, DELETE (com confirmação) | ✅ (mock) · ☕ (real) |
| Loading, erro e vazio em toda tela com dados | ✅ `DataState` |
| Mensagens para 400, 404, 500 e rede | ✅ `services/api.ts` |
| `useState`, `useEffect`, `useContext`, `useFetch<T>` | ✅ |
| Validação de formulários | ✅ |
| `endpoints.ts`, services, mappers, mocks com `VITE_USE_MOCK` | ✅ |
| `CONTRATO_API.md` e `INTEGRACAO_JAVA.md` | ✅ `docs/` |
| API publicada em HTTPS com CORS | ☕ |

## Responsividade e acessibilidade

| Requisito | Status |
|---|---|
| Mobile (≤480), tablet (768), desktop (992+) sem quebra | ✅ testado em 375, 390, 800 e 1280px |
| `sm:`, `md:`, `lg:`, `xl:` em layout, grids, fontes e espaçamentos | ✅ |
| `alt`, labels, contraste, teclado (foco visível, Esc fecha menu/modal) | ✅ |

## Qualidade

| Requisito | Status |
|---|---|
| Estrutura de pastas exigida | ✅ |
| Sem `console.log` / código morto | ✅ |
| `npm run build` e `npm run lint` sem erros | ✅ |

## Deploy

| Requisito | Status |
|---|---|
| `vercel.json` com rewrite de SPA | ✅ |
| `.env.example` no repo e `.env` no `.gitignore` | ✅ |
| Projeto criado na Vercel + variáveis configuradas | 🙋 |
| Variáveis da API real na Vercel | ☕ |

## Git / GitHub

| Requisito | Status |
|---|---|
| Gitflow (`main`, `develop`, `feature/*`) e commits semânticos | ✅ |
| ≥ 5 commits por integrante | 🙋 ver `docs/DIVISAO_TAREFAS.md` |
| Repositório público | ✅ (conferido) |

## README e entrega

| Requisito | Status |
|---|---|
| README com as 7 seções | ✅ |
| Links da Vercel, do YouTube e da API | 🙋 / ☕ (`[INSERIR LINK]`) |
| Vídeo de até 3 min | 🙋 `docs/ROTEIRO_VIDEO.md` |
| .ZIP sem `node_modules`, < 50MB, pelo Portal do Aluno | 🙋 |
