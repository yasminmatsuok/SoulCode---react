# Contrato da API — SoulCode (front-end ↔ Java/Quarkus)

Este documento descreve **exatamente** o que o front-end espera da API RESTful.
Se algum nome de rota ou campo precisar ser diferente, avise o time do front: a mudança é feita em
`src/config/endpoints.ts` (rotas) e `src/mappers/` + `src/types/api.ts` (campos).

## Regras gerais

| Item | Valor esperado |
|---|---|
| Formato | JSON (`Content-Type: application/json`) em requisições e respostas |
| Datas | ISO 8601 em UTC, ex.: `"2026-10-30T14:05:00Z"` |
| Ids | número inteiro (`Long` no Java) |
| Nomes de campos | camelCase, em português, exatamente como abaixo |
| Base URL | sem prefixo obrigatório (ex.: `https://api-soulcode.exemplo.com`) — se usar `/api`, avise |
| Usuário | ainda não há login; o front usa o usuário `id = 1` |

### Formato de erro (todas as rotas)

Para respostas 4xx, devolver um corpo com a mensagem que o usuário vai ler:

```json
{ "mensagem": "Saldo insuficiente: você tem 150 pontos e precisa de 300." }
```

> O front também aceita o campo `message` (padrão do Quarkus). Para 5xx, o front mostra uma mensagem genérica.

| Status | Quando usar |
|---|---|
| 200 OK | GET, PUT, PATCH com sucesso (devolve o recurso) |
| 201 Created | POST com sucesso (devolve o recurso criado) |
| 204 No Content | DELETE com sucesso (sem corpo) |
| 400 Bad Request | validação falhou ou regra de negócio violada (com `mensagem`) |
| 404 Not Found | id inexistente (com `mensagem`) |
| 409 Conflict | operação incompatível com o estado atual (ex.: cancelar conversão já aprovada) |
| 500 Internal Server Error | erro inesperado |

### CORS (obrigatório)

Liberar as origens `http://localhost:5173` e `https://soul-code-react.vercel.app`, métodos
`GET, POST, PUT, PATCH, DELETE, OPTIONS` e header `Content-Type`. Exemplo para `application.properties`:

```properties
quarkus.http.cors=true
quarkus.http.cors.origins=http://localhost:5173,https://soul-code-react.vercel.app
quarkus.http.cors.methods=GET,POST,PUT,PATCH,DELETE,OPTIONS
quarkus.http.cors.headers=Content-Type
```

---

## Resumo das rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/missoes` | Lista missões |
| GET | `/missoes/{id}` | Detalhe de uma missão |
| POST | `/missoes` | Cria missão |
| PUT | `/missoes/{id}` | Atualiza missão (todos os campos) |
| DELETE | `/missoes/{id}` | Exclui missão |
| POST | `/missoes/{id}/conclusoes` | Registra conclusão da missão e soma pontos ao usuário |
| GET | `/recompensas` | Lista recompensas |
| GET | `/recompensas/{id}` | Detalhe de uma recompensa |
| POST | `/recompensas` | Cria recompensa |
| PUT | `/recompensas/{id}` | Atualiza recompensa (todos os campos) |
| PATCH | `/recompensas/{id}` | Atualiza só alguns campos (ex.: `ativa`) |
| DELETE | `/recompensas/{id}` | Exclui recompensa |
| GET | `/usuarios/{usuarioId}/saldo` | Saldo de pontos do usuário |
| GET | `/usuarios/{usuarioId}/conversoes` | Histórico de conversões do usuário |
| POST | `/conversoes` | Converte pontos em uma recompensa |
| PATCH | `/conversoes/{id}/status` | Altera o status de uma conversão (ex.: cancelar) |

---

## 1. Missões

### Objeto `Missao`

```json
{
  "id": 1,
  "icone": "🚌",
  "titulo": "Use Transporte Público",
  "descricao": "Utilize o transporte público por 5 dias seguidos e registre suas viagens.",
  "descricaoLonga": "Durante 5 dias seguidos, prefira o transporte público...",
  "pontos": 50,
  "dificuldade": "facil"
}
```

| Campo | Tipo | Regras |
|---|---|---|
| `id` | number | gerado pela API |
| `icone` | string | um emoji |
| `titulo` | string | obrigatório, 3–60 caracteres |
| `descricao` | string | obrigatório, 10–140 caracteres |
| `descricaoLonga` | string | obrigatório, 20–600 caracteres |
| `pontos` | number | inteiro, 1–1000 |
| `dificuldade` | string | `"facil"`, `"medio"` ou `"dificil"` |

### `GET /missoes` → 200

Array de `Missao` (pode ser `[]`).

### `GET /missoes/{id}` → 200 | 404

### `POST /missoes` → 201 | 400

Body: `Missao` **sem** `id`. Resposta: a missão criada, com `id`.

### `PUT /missoes/{id}` → 200 | 400 | 404

Body: `Missao` sem `id`. Resposta: a missão atualizada.

### `DELETE /missoes/{id}` → 204 | 404

### `POST /missoes/{id}/conclusoes` → 201 | 404

Body:

```json
{ "usuarioId": 1 }
```

Efeito: soma `pontos` da missão em `pontosDisponiveis` **e** `pontosAcumulados` do usuário.
Resposta: o **Saldo** atualizado (ver seção 3).

---

## 2. Recompensas

### Objeto `Recompensa`

```json
{
  "id": 1,
  "nome": "10% de desconto na conta de luz",
  "descricao": "Desconto aplicado na próxima fatura de energia elétrica junto à distribuidora parceira.",
  "icone": "💡",
  "categoria": "energia",
  "custoPontos": 300,
  "estoque": 20,
  "ativa": true,
  "criadaEm": "2026-09-01T10:00:00Z"
}
```

| Campo | Tipo | Regras |
|---|---|---|
| `id` | number | gerado pela API |
| `nome` | string | obrigatório, 3–80 caracteres |
| `descricao` | string | obrigatório, 15–300 caracteres |
| `icone` | string | um emoji |
| `categoria` | string | `"energia"`, `"transporte"`, `"alimentacao"`, `"cultura"` ou `"parceiros"` |
| `custoPontos` | number | inteiro, 10–100000 |
| `estoque` | number | inteiro, ≥ 0 |
| `ativa` | boolean | se pode ser convertida |
| `criadaEm` | string (ISO) | gerado pela API |

### `GET /recompensas` → 200

Array de `Recompensa` (todas, inclusive inativas — o front filtra).

### `GET /recompensas/{id}` → 200 | 404

### `POST /recompensas` → 201 | 400

Body: `Recompensa` **sem** `id` e `criadaEm`.

### `PUT /recompensas/{id}` → 200 | 400 | 404

Body: `Recompensa` sem `id` e `criadaEm`.

### `PATCH /recompensas/{id}` → 200 | 400 | 404

Body parcial — o front usa para ativar/desativar:

```json
{ "ativa": false }
```

Resposta: a recompensa completa, atualizada.

### `DELETE /recompensas/{id}` → 204 | 404

---

## 3. Saldo

### `GET /usuarios/{usuarioId}/saldo` → 200 | 404

```json
{
  "usuarioId": 1,
  "pontosDisponiveis": 450,
  "pontosAcumulados": 650,
  "pontosConvertidos": 200
}
```

| Campo | Significado |
|---|---|
| `pontosDisponiveis` | pontos que podem ser gastos agora |
| `pontosAcumulados` | total ganho na vida (não diminui ao converter) — o **nível** é calculado no front a partir dele |
| `pontosConvertidos` | total já gasto em conversões não canceladas |

---

## 4. Conversões

### Objeto `Conversao`

```json
{
  "id": 4,
  "usuarioId": 1,
  "recompensaId": 2,
  "recompensaNome": "R$ 10 no Bilhete Único",
  "quantidade": 2,
  "pontosGastos": 300,
  "status": "pendente",
  "criadaEm": "2026-10-30T14:05:00Z"
}
```

`status`: `"pendente"`, `"aprovada"` ou `"cancelada"`.

### `GET /usuarios/{usuarioId}/conversoes` → 200 | 404

Array de `Conversao`, **da mais recente para a mais antiga** (pode ser `[]`).

### `POST /conversoes` → 201 | 400 | 404

Body:

```json
{ "usuarioId": 1, "recompensaId": 2, "quantidade": 2 }
```

Regras (nesta ordem):

1. Recompensa inexistente → **404** `"Recompensa #X não encontrada."`
2. `quantidade` não inteira ou < 1 → **400**
3. Recompensa com `ativa = false` → **400** `"Esta recompensa está indisponível no momento."`
4. `estoque < quantidade` → **400** `"Estoque insuficiente: restam N unidade(s)."`
5. `pontosDisponiveis < custoPontos × quantidade` → **400** `"Saldo insuficiente: você tem X pontos e precisa de Y."`

Se tudo ok: `pontosGastos = custoPontos × quantidade`; diminui `estoque`; diminui `pontosDisponiveis`;
soma em `pontosConvertidos`; cria a conversão com `status = "pendente"` e devolve **201** com ela.

### `PATCH /conversoes/{id}/status` → 200 | 400 | 404 | 409

Body:

```json
{ "status": "cancelada" }
```

- Só conversões `pendente` podem mudar → senão **409** `"Somente conversões pendentes podem ser alteradas."`
- Ao **cancelar**: devolve `pontosGastos` para `pontosDisponiveis`, subtrai de `pontosConvertidos` e devolve
  `quantidade` ao estoque da recompensa.
- Resposta: a conversão atualizada.

---

## Dados iniciais sugeridos

Para a demonstração ficar igual ao mock, popular o banco com os mesmos dados de `src/mocks/seed.ts`
(6 missões, 7 recompensas, 3 conversões e o saldo do usuário 1).
