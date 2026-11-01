# Roteiro do vídeo (até 3 minutos)

**Antes de gravar:** `npm run dev` (ou abrir o link da Vercel), navegador em tela cheia, DevTools fechado (abra só na
cena 6). Não aperte F5 durante a gravação se estiver no mock, porque os dados voltam ao início.

| Tempo | Cena | O que mostrar e falar |
|---|---|---|
| 0:00–0:15 | **Abertura** | Home. "Somos o grupo SoulCode. Nossa solução transforma ações sustentáveis em pontos que o usuário converte em recompensas reais." Mostre o saldo no header. |
| 0:15–0:35 | **Tecnologias** | Página Sobre. "React com Vite e TypeScript, estilização só com Tailwind, rotas com React Router, requisições com fetch nativo e API RESTful em Java com Spring Boot." |
| 0:35–1:05 | **Missões (CRUD)** | Missões → filtro por dificuldade → abrir uma missão (mostre a URL `/missoes/1`, rota dinâmica) → **Concluir missão** (toast e saldo sobe) → **Nova missão**: enviar vazio para mostrar a validação, preencher e salvar → editar → excluir com o modal de confirmação. |
| 1:05–1:30 | **Recompensas** | Catálogo: busca, categoria, "só o que posso resgatar". Abrir uma → **Desativar/Ativar** (PATCH) → "Converter agora". |
| 1:30–1:55 | **Conversão** | Tela Converter: trocar a quantidade e mostrar o resumo "saldo após". Pôr uma quantidade alta para mostrar "Saldo insuficiente". Confirmar → redireciona para o Histórico com toast. |
| 1:55–2:10 | **Histórico** | Filtro por status → **Cancelar** uma pendente (modal) → pontos voltam ao saldo. |
| 2:10–2:25 | **Rotas e erros** | Digitar `/recompensas/abc` (toast + volta à lista), `/recompensas/999` (não encontrada) e `/qualquer-coisa` (404 personalizada). |
| 2:25–2:45 | **Responsividade** | DevTools → modo dispositivo: iPhone (menu hambúrguer), iPad e desktop. |
| 2:45–3:00 | **Integração e fechamento** | Aba Network mostrando as chamadas para a API (GET, POST, PUT, PATCH, DELETE). "O código está no GitHub, com deploy na Vercel. Obrigado!" Mostre a página Integrantes. |

> Se a API Java ainda não estiver no ar, grave com o mock e diga: "os services já estão prontos para a API real; basta
> mudar uma variável de ambiente". Na cena final mostre rapidamente `src/config/endpoints.ts`.
