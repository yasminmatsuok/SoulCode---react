# Divisão de tarefas — Sprint 4

Requisito: **cada integrante com no mínimo 5 commits próprios**, feitos com a própria conta do GitHub, seguindo
Gitflow e commits semânticos.

## Fluxo para cada integrante

```bash
git checkout develop
git pull
git checkout -b feature/<nome-da-tarefa>
# ...faz a alteração...
git add .
git commit -m "tipo: descrição curta"      # feat, fix, docs, style, refactor, chore
git push -u origin feature/<nome-da-tarefa>
# abrir Pull Request para develop no GitHub e pedir revisão
```

> Antes de commitar: `git config user.name` e `git config user.email` precisam ser **os seus** (do seu GitHub).
> Rode `npm run build` e `npm run lint` antes de abrir o PR.

## Yasmin de Oliveira Matsuok — Front-End (concluído)

Estrutura de API, mocks, contextos, hooks, rotas, páginas de Missões, Recompensas, Conversão, Histórico, 404,
responsividade, deploy e documentação técnica.

## Davi Trindade Ribeiro — Integração com o Java

| # | Tarefa | Arquivo(s) | Commit sugerido |
|---|---|---|---|
| 1 | Conferir o contrato e registrar o que mudou na API | `docs/CONTRATO_API.md` | `docs: atualiza contrato com a API implementada` |
| 2 | Ajustar caminhos se diferentes do contrato | `src/config/endpoints.ts` | `fix: alinha endpoints com a API Quarkus` |
| 3 | Ajustar nomes de campos, se necessário | `src/types/api.ts`, `src/mappers/*` | `fix: ajusta mappers aos campos da API` |
| 4 | Colocar a URL pública da API no exemplo de env | `.env.example` | `chore: adiciona URL da API publicada no env de exemplo` |
| 5 | Preencher "API Java" no README | `README.md` | `docs: adiciona link da API Java no README` |

## Murilo Gomes Santiago Carnaval — Dados

| # | Tarefa | Arquivo(s) | Commit sugerido |
|---|---|---|---|
| 1 | Documentar as tabelas que sustentam a API | `docs/MODELO_DADOS.md` (novo) | `docs: adiciona modelo de dados do banco` |
| 2 | Adicionar 2 recompensas novas ao mock (iguais às do banco) | `src/mocks/seed.ts` | `feat: adiciona recompensas ao seed do mock` |
| 3 | Adicionar 2 missões novas ao mock | `src/mocks/seed.ts` | `feat: adiciona missões ao seed do mock` |
| 4 | Revisar os números da seção de estatísticas da Home | `src/pages/Home.tsx` | `fix: atualiza estatísticas da plataforma` |
| 5 | Criar o script SQL de carga inicial igual ao seed | `docs/carga_inicial.sql` (novo) | `docs: adiciona script de carga inicial` |

## Maria Vitória Cândida Carvalho — Avatar e Chat

| # | Tarefa | Arquivo(s) | Commit sugerido |
|---|---|---|---|
| 1 | Nova resposta do chat: "Como converter pontos?" | `src/components/ChatWidget.tsx` | `feat: chat explica como converter pontos` |
| 2 | Adicionar a sugestão no botão de atalhos do chat | `src/components/ChatWidget.tsx` | `feat: adiciona atalho de conversão no chat` |
| 3 | Aceitar perguntas sem acento (ex.: "missoes") | `src/components/ChatWidget.tsx` | `fix: normaliza acentos nas perguntas do chat` |
| 4 | Revisar textos dos cards "O que o Soul pode fazer" | `src/pages/Avatar.tsx` | `docs: revisa textos das funcionalidades do avatar` |
| 5 | Nova pergunta no FAQ sobre o Avatar | `src/data/faq.ts` | `docs: adiciona pergunta sobre o avatar no FAQ` |

## Yasmin Cappi Santos — Documentação e UX Writing

| # | Tarefa | Arquivo(s) | Commit sugerido |
|---|---|---|---|
| 1 | Revisar as mensagens de erro amigáveis | `src/services/api.ts` (`MENSAGENS_PADRAO`) | `docs: revisa mensagens de erro exibidas ao usuário` |
| 2 | Revisar os textos de listas vazias | `src/pages/Recompensas.tsx`, `Historico.tsx`, `Missoes.tsx` | `docs: revisa textos dos estados vazios` |
| 3 | Revisar a página Sobre (problema/solução) | `src/pages/Sobre.tsx` | `docs: revisa textos da página Sobre` |
| 4 | Adicionar link do vídeo e da Vercel no README | `README.md` | `docs: adiciona links do vídeo e do deploy` |
| 5 | Revisar o roteiro do vídeo após a gravação | `docs/ROTEIRO_VIDEO.md` | `docs: atualiza roteiro do vídeo` |

## Ao final

Quem tiver permissão faz o merge de `develop` em `main` (PR `develop → main`) com todos os PRs aprovados.
