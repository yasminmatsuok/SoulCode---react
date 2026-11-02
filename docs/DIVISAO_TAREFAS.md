# Divisão de tarefas — Sprint 4

Requisito: **cada integrante com no mínimo 5 commits próprios**, feitos com a própria conta do GitHub, seguindo
Gitflow e commits semânticos. **Cada tarefa abaixo = 1 commit.**

## Fluxo para cada integrante

```bash
git checkout develop
git pull
git checkout -b feature/<seu-nome>-sprint4
# ...faz UMA tarefa...
git add <arquivos da tarefa>
git commit -m "tipo: descrição curta"      # use o commit sugerido da tabela
# ...repete para as outras 4 tarefas (um commit por tarefa)...
git push -u origin feature/<seu-nome>-sprint4
# abrir Pull Request para develop no GitHub e pedir revisão
```

> Antes de commitar: `git config user.name` e `git config user.email` precisam ser **os seus** (do seu GitHub),
> senão o commit não conta para você.
> Rode `npm run build` e `npm run lint` antes de abrir o PR.
> Cada pessoa mexe só nos arquivos da própria tabela, assim ninguém dá conflito com ninguém.

## Yasmin de Oliveira Matsuok — Front-End (concluído)

Estrutura de API, mocks, contextos, hooks, rotas, páginas de Missões, Recompensas, Conversão, Histórico, Usuários
(CRUD na API Java), 404, responsividade, deploy na Vercel e no GitHub Pages, proxy da API na Vercel, documentação
técnica e correções na API Java (idade, cidade e interesse salvos no banco e senha fora das respostas).

## Davi Trindade Ribeiro — Integração com o Java

**API Java (repositório JavaDBC):** a integração já funciona pelo proxy da Vercel (`vercel.json`). Liberar o CORS
direto no `config/CorsFilter.java` é recomendado (o passo a passo está com a Yasmin).

| # | Tarefa | Arquivo(s) | Commit sugerido |
|---|---|---|---|
| 1 | Trocar "Quarkus" por "Spring Boot" e explicar o CORS atual (`CorsFilter` na API + proxy da Vercel) | `docs/CONTRATO_API.md` | `docs: troca exemplo de CORS do Quarkus para Spring Boot` |
| 2 | Criar a seção "5. Usuários e Avatares" com as rotas `/api/status`, `/api/usuarios` (GET, POST, PUT, DELETE) e `/api/avatares` | `docs/CONTRATO_API.md` | `docs: adiciona rotas de usuários e avatares ao contrato` |
| 3 | Adicionar exemplos de JSON de usuário e de avatar nessa seção (sem o campo de senha) | `docs/CONTRATO_API.md` | `docs: adiciona exemplos de resposta de usuários e avatares` |
| 4 | Explicar como rodar a API localmente (JDK, variáveis do Oracle, porta) e onde fica o CORS | `docs/INTEGRACAO_JAVA.md` | `docs: explica execução local e CORS da API Spring` |
| 5 | Marcar ✅ "API publicada em HTTPS com CORS" e "Variáveis da API real na Vercel" | `docs/CHECKLIST.md` | `docs: atualiza checklist da integração com a API` |

## Murilo Gomes Santiago Carnaval — Dados

| # | Tarefa | Arquivo(s) | Commit sugerido |
|---|---|---|---|
| 1 | Documentar as tabelas reais `T_SU_USUARIO`, `T_SU_AVATAR` e `T_SU_PONTUACAO` (colunas, tipos, chaves) | `docs/MODELO_DADOS.md` (novo) | `docs: adiciona modelo de dados de usuários e avatares` |
| 2 | Documentar `T_SU_MISSAO`, `T_SU_TIPO_ACAO`, `T_SU_ACAO_USUARIO` e os relacionamentos | `docs/MODELO_DADOS.md` | `docs: adiciona tabelas de missões e ações ao modelo de dados` |
| 3 | Adicionar 2 missões novas ao mock (ex.: "Leve sua Ecobag", "Composte Restos de Comida") | `src/mocks/seed.ts` (`MISSOES_SEED`) | `feat: adiciona missões ao seed do mock` |
| 4 | Adicionar 2 recompensas novas ao mock | `src/mocks/seed.ts` (`RECOMPENSAS_SEED`) | `feat: adiciona recompensas ao seed do mock` |
| 5 | Criar o script SQL das tabelas que faltam (`T_SU_RECOMPENSA`, `T_SU_CONVERSAO`) com as recompensas do seed | `docs/carga_inicial.sql` (novo) | `docs: adiciona script SQL das tabelas de recompensas e conversões` |

## Maria Vitória Cândida Carvalho — Avatar e Chat

| # | Tarefa | Arquivo(s) | Commit sugerido |
|---|---|---|---|
| 1 | Nova resposta do chat para "como converter pontos?" (explicando a página Converter) | `src/components/ChatWidget.tsx` (`montarRespostas`) | `feat: chat explica como converter pontos` |
| 2 | Adicionar "Como converter pontos?" nas sugestões do chat | `src/components/ChatWidget.tsx` (`SUGESTOES`) | `feat: adiciona atalho de conversão no chat` |
| 3 | Aceitar perguntas sem acento e sem "?" (ex.: "ver minhas missoes") | `src/components/ChatWidget.tsx` (`sendMessage`) | `fix: normaliza acentos e pontuação nas perguntas do chat` |
| 4 | Nova pergunta no FAQ: "Como cadastro um usuário e crio meu avatar?" | `src/data/faq.ts` | `docs: adiciona pergunta sobre cadastro e avatar no FAQ` |
| 5 | Nova pergunta no FAQ: "Por que o site demora na primeira vez?" (API no Render "dorme") | `src/data/faq.ts` | `docs: explica no FAQ a demora da primeira requisição` |

## Yasmin Cappi Santos — Documentação e UX Writing

| # | Tarefa | Arquivo(s) | Commit sugerido |
|---|---|---|---|
| 1 | Revisar as mensagens de erro amigáveis | `src/services/api.ts` (`MENSAGENS_PADRAO`) | `docs: revisa mensagens de erro exibidas ao usuário` |
| 2 | Revisar os textos de listas vazias de Usuários e Avatares | `src/pages/Usuarios.tsx` | `docs: revisa textos dos estados vazios de usuários` |
| 3 | Revisar os textos e mensagens do formulário de usuário | `src/pages/UsuarioForm.tsx` | `docs: revisa textos do formulário de usuário` |
| 4 | Incluir no roteiro do vídeo uma cena da página Usuários (CRUD na API real) | `docs/ROTEIRO_VIDEO.md` | `docs: adiciona cena de usuários ao roteiro do vídeo` |
| 5 | Colocar o link do vídeo do YouTube no README (troca o `[INSERIR LINK]`) | `README.md` | `docs: adiciona link do vídeo no README` |

## Ao final

Quem tiver permissão faz o merge de `develop` em `main` (PR `develop → main`) com todos os PRs aprovados.
A Vercel publica sozinha a `main`. Para atualizar o GitHub Pages, rode `npm run build:pages` e publique o `dist/` na
branch `gh-pages` (ver README).
