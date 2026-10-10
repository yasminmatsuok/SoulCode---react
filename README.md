# SoulCode — Avatar Inteligente (Sprint 4)

Projeto da disciplina **Front-End Design Engineering** (FIAP) — Sprint 4.
Evolução do site estático (HTML/CSS/JS) das sprints anteriores para uma
**Single Page Application (SPA)** construída com **React + Vite + TypeScript**,
agora integrada à **API REST em Java (DDD)** desenvolvida pelo grupo.

## Descrição do projeto

A SoulUp é uma plataforma digital que transforma interações online em
benefícios reais para os usuários e impacto positivo para o planeta, através
de um **Avatar Inteligente** que sugere ações sustentáveis, acompanha missões
e gera recompensas. Este repositório contém o front-end da aplicação.

## Tecnologias utilizadas

- React 19
- Vite
- TypeScript
- TailwindCSS
- React Router DOM
- React Hook Form

## Estrutura de pastas

```
src/
  assets/        # imagens (fotos da equipe, favicon)
  components/    # componentes reutilizáveis (Header, Footer, Cards, ChatWidget...)
  data/          # dados estáticos tipados (equipe, FAQ)
  hooks/         # hooks customizados (useApi)
  services/      # camada de integração com a API (fetch)
  pages/         # páginas da aplicação (uma por rota)
  types/         # tipos TypeScript compartilhados
  App.tsx        # configuração das rotas (React Router)
  main.tsx       # ponto de entrada da aplicação
  index.css      # estilos globais e diretivas do Tailwind
```

## Páginas / Rotas

| Rota           | Página                          |
|----------------|----------------------------------|
| `/`            | Home                             |
| `/sobre`       | Sobre o projeto                  |
| `/avatar`      | Avatar Inteligente (chat)         |
| `/missoes`     | Lista de missões (com filtro)    |
| `/missoes/:id` | Detalhe de uma missão (rota dinâmica) |
| `/missoes/nova` | Cadastro de missão (POST) |
| `/missoes/:id/editar` | Edição de missão (PUT) |
| `/faq`         | Perguntas frequentes (accordion) |
| `/integrantes` | Equipe do projeto                |
| `/contato`     | Formulário de contato (React Hook Form) |

## Como usar

- **Repositório GitHub:** `COLOCAR_LINK_AQUI`
- **Vídeo de apresentação (YouTube):** `COLOCAR_LINK_AQUI`
- **Deploy na Vercel:** `COLOCAR_LINK_AQUI`
- **API publicada (Java):** `COLOCAR_URL_AQUI`

### Executar localmente

```bash
# instalar as dependências
npm install

# criar o arquivo de ambiente e informar a URL da API
cp .env.example .env     # edite VITE_API_URL

# rodar em modo desenvolvimento
npm run dev

# gerar build de produção
npm run build
```

A aplicação sobe por padrão em `http://localhost:5173`.

> Para desenvolvimento sem a API Java, `npm run mock` sobe uma API fake em
> `http://localhost:3001` (dados em `mock/db.json`).

## Integrantes do grupo

- Yasmin de Oliveira Matsuok — RM573083 — Front-End Design Engineering
- Murilo Gomes Santiago Carnaval — RM573067 — Database Administrator
- Davi Trindade Ribeiro — RM571336 — Backend Developer - Java & Python
- Yasmin Cappi Santos — RM571926 — Documentation, UX Writing & Pitch
- Maria Vitória Cândida Carvalho — RM570850 — Artificial Intelligence & Chatbot
