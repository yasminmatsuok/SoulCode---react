# Roteiro do vídeo (até 3 minutos)

**Antes de gravar:** `npm run dev` (ou abrir o link da Vercel), navegador em tela cheia, DevTools fechado (abra só na
cena final). Não aperte F5 durante a gravação se estiver no mock, porque os dados voltam ao início.
**Uns 2 minutos antes de gravar, abra a página Usuários** para "acordar" a API no Render. Assim ela não demora
na hora da cena.

| Tempo | Cena | O que mostrar e falar |
|---|---|---|
| 0:00–0:12 | **Abertura** | Home. "Somos o grupo SoulCode. Nossa solução transforma ações sustentáveis em pontos que o usuário converte em recompensas reais." Mostre o saldo no header. |
| 0:12–0:27 | **Tecnologias** | Página Sobre. "React com Vite e TypeScript, estilização só com Tailwind, rotas com React Router, requisições com fetch nativo e API RESTful em Java com Spring Boot." |
| 0:27–0:52 | **Missões (CRUD)** | Missões → filtro por dificuldade → abrir uma missão (mostre a URL `/missoes/1`, rota dinâmica) → **Concluir missão** (toast e saldo sobe) → **Nova missão**: enviar vazio para mostrar a validação, preencher e salvar → editar → excluir com o modal de confirmação. |
| 0:52–1:12 | **Recompensas** | Catálogo: busca, categoria, "só o que posso resgatar". Abrir uma → **Desativar/Ativar** (PATCH) → "Converter agora". |
| 1:12–1:32 | **Conversão** | Tela Converter: trocar a quantidade e mostrar o resumo "saldo após". Pôr uma quantidade alta para mostrar "Saldo insuficiente". Confirmar → redireciona para o Histórico com toast. |
| 1:32–1:45 | **Histórico** | Filtro por status → **Cancelar** uma pendente (modal) → pontos voltam ao saldo. |
| 1:45–2:15 | **Usuários (API Java real)** | Página Usuários. "Esta página conversa com a nossa API em Spring Boot." Buscar por nome → **Novo usuário**: enviar vazio para mostrar a validação, preencher e salvar → abrir o usuário criado → editar → excluir com o modal. Mostrar a lista de avatares embaixo. |
| 2:15–2:28 | **Rotas e erros** | Digitar `/recompensas/abc` (toast + volta à lista), `/recompensas/999` (não encontrada) e `/qualquer-coisa` (404 personalizada). |
| 2:28–2:45 | **Responsividade** | DevTools → modo dispositivo: iPhone (menu hambúrguer), iPad e desktop. |
| 2:45–3:00 | **Integração e fechamento** | Aba Network mostrando as chamadas para a API (GET, POST, PUT, PATCH, DELETE). "O código está no GitHub, com deploy na Vercel e no GitHub Pages. Obrigado!" Mostre a página Integrantes. |

> Se a API Java estiver fora do ar na hora, grave as outras cenas com o mock e diga: "os services já estão prontos para a API real; basta
> mudar uma variável de ambiente". Na cena final mostre rapidamente `src/config/endpoints.ts`.