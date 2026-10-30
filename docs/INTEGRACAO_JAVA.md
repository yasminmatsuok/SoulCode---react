# Integração com a API Java — passo a passo

O front já está pronto e funcionando com dados mockados. Quando a API Java chegar, siga estes passos.

## 1. O que pedir para a pessoa do Java

Envie o arquivo [`CONTRATO_API.md`](./CONTRATO_API.md) e peça:

- [ ] **Rotas e campos iguais ao contrato** (ou uma lista do que ficou diferente).
- [ ] **CORS liberado** para `http://localhost:5173` **e** para o domínio da Vercel (`https://soul-code-react.vercel.app`),
      com os métodos `GET, POST, PUT, PATCH, DELETE, OPTIONS` e o header `Content-Type`.
      Sem isso o navegador bloqueia as requisições e o site mostra "Não foi possível conectar ao servidor".
- [ ] **API publicada em HTTPS** (Render, Railway, Azure etc.). A Vercel é HTTPS e o navegador bloqueia chamadas
      para `http://` (*mixed content*).
- [ ] **URL pública da API** para colocar no `.env`, na Vercel e no README.
- [ ] Dados iniciais iguais ao `src/mocks/seed.ts` (para o vídeo ficar igual).

## 2. Configurar e testar localmente

1. No arquivo `.env` (copie de `.env.example` se não existir):

   ```env
   VITE_API_URL=https://url-da-api.com
   VITE_USE_MOCK=false
   VITE_USUARIO_ID=1
   ```

   > Sem barra no final da URL. Se a API usar prefixo (ex.: `/api`), coloque na URL: `https://url-da-api.com/api`.

2. Reinicie o servidor (o Vite só lê o `.env` ao iniciar): `Ctrl + C` e `npm run dev`.
3. Teste no navegador, com o DevTools aberto na aba **Network**:
   - `/missoes` e `/recompensas` carregam a lista (GET)
   - abrir um item carrega o detalhe (GET por id)
   - criar, editar, ativar/desativar e excluir (POST, PUT, PATCH, DELETE)
   - `/converter` faz uma conversão e `/historico` cancela uma pendente

## 3. Se algo não bater com o contrato

Ajuste **somente** estes arquivos — nenhum componente precisa mudar:

| Problema | Arquivo |
|---|---|
| Caminho diferente (ex.: `/api/v1/rewards`) | `src/config/endpoints.ts` |
| Nome de campo diferente (ex.: `title` em vez de `titulo`) | `src/types/api.ts` + o mapper em `src/mappers/` |
| Formato de data/id diferente | o mapper em `src/mappers/` |

Exemplo — se o Java devolver `title` em vez de `titulo`:

```ts
// src/types/api.ts
export interface MissaoApi { id: number; title: string; /* ... */ }

// src/mappers/missaoMapper.ts
titulo: dto.title,
```

## 4. Erros comuns

| Sintoma | Causa provável |
|---|---|
| "Não foi possível conectar ao servidor" | API fora do ar, URL errada, **CORS** não liberado ou API em HTTP |
| Erro de CORS no console | pedir para incluir a origem exata (com `https://` e sem barra no final) |
| 404 em todas as rotas | prefixo `/api` faltando na `VITE_API_URL` ou caminhos diferentes em `endpoints.ts` |
| Campos vazios na tela | nome de campo diferente → ajustar `types/api.ts` e o mapper |

## 5. Configurar na Vercel

1. Vercel → projeto → **Settings → Environment Variables**.
2. Adicione (marque Production, Preview e Development):

   | Nome | Valor |
   |---|---|
   | `VITE_API_URL` | `https://url-da-api.com` |
   | `VITE_USE_MOCK` | `false` |
   | `VITE_USUARIO_ID` | `1` |

3. **Deployments → ⋯ → Redeploy** (as variáveis `VITE_` entram no build; sem redeploy nada muda).
4. Abra o site, recarregue uma rota dinâmica (ex.: `/recompensas/1`) — deve abrir normalmente graças ao `vercel.json`.

> Enquanto a API não estiver pronta, deixe `VITE_USE_MOCK=true` na Vercel (ou não crie a variável): o site funciona
> com os dados mockados.

## 6. Finalizar

- [ ] Colocar a URL da API no `README.md` (seção "Como usar")
- [ ] Commit: `git commit -m "chore: integra front com a API Java"` numa branch `feature/integracao-api-java`
- [ ] Gravar o vídeo mostrando o CRUD com a API real (aba Network aberta ajuda a provar)
