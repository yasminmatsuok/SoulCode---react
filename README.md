# SoulCode — Avatar Inteligente (Sprint 3)

Projeto da disciplina **Front-End Design Engineering** (FIAP) — Sprint 3.
Evolução do site estático (HTML/CSS/JS) das sprints anteriores para uma
**Single Page Application (SPA)** construída com **React + Vite + TypeScript**.

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
  data/          # dados tipados (missões, equipe, FAQ)
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
| `/faq`         | Perguntas frequentes (accordion) |
| `/integrantes` | Equipe do projeto                |
| `/contato`     | Formulário de contato (React Hook Form) |

## Como executar localmente

```bash
# instalar as dependências
npm install

# rodar em modo desenvolvimento
npm run dev

# gerar build de produção
npm run build
```

A aplicação sobe por padrão em `http://localhost:5173`.

## Link do repositório

> Substitua pelo link do repositório GitHub do grupo:
> `https://github.com/seu-usuario/seu-repositorio`

## Integrantes do grupo

- Yasmin de Oliveira Matsuok — RM573083 — Front-End Design Engineering
- Murilo Gomes Santiago Carnaval — RM573067 — Database Administrator
- Davi Trindade Ribeiro — RM571336 — Backend Developer - Java & Python
- Yasmin Cappi Santos — RM571926 — Documentation, UX Writing & Pitch
- Maria Vitória Cândida Carvalho — RM570850 — Artificial Intelligence & Chatbot
