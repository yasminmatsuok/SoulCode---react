# Modelo de dados — SoulCode

Tabelas do banco que sustentam a API Java (Spring Boot). Os nomes das colunas seguem os campos do JSON descritos em
[`CONTRATO_API.md`](./CONTRATO_API.md).

## Tabela `usuario`

Já usada pela API publicada (`/api/usuarios`).

| Coluna | Tipo | Restrições | Descrição |
|---|---|---|---|
| `id` | BIGINT | PK, auto incremento | identificador do usuário |
| `nome` | VARCHAR(100) | NOT NULL | nome completo |
| `email` | VARCHAR(150) | NOT NULL, UNIQUE | e-mail de contato |
| `senha_hash` | VARCHAR(255) | NOT NULL | hash da senha (nunca devolvido pela API) |
| `idade` | INT | CHECK (idade BETWEEN 10 AND 120) | idade em anos |
| `cidade` | VARCHAR(80) | | cidade onde mora |
| `interesse` | VARCHAR(30) | | Reciclagem, Energia, Transporte, Alimentação ou Água |
| `pontos` | INT | NOT NULL, DEFAULT 0 | pontos disponíveis do usuário |

## Tabela `avatar`

Já usada pela API publicada (`/api/avatares`). Cada avatar pertence a um usuário.

| Coluna | Tipo | Restrições | Descrição |
|---|---|---|---|
| `id` | BIGINT | PK, auto incremento | identificador do avatar |
| `usuario_id` | BIGINT | FK → `usuario.id`, NOT NULL | dono do avatar |
| `nome` | VARCHAR(60) | NOT NULL | nome do avatar (ex.: EcoDavi) |
| `nivel` | INT | NOT NULL, DEFAULT 1 | nível do avatar |

## Tabela `missao`

| Coluna | Tipo | Restrições | Descrição |
|---|---|---|---|
| `id` | BIGINT | PK, auto incremento | identificador da missão |
| `icone` | VARCHAR(10) | NOT NULL | emoji da missão |
| `titulo` | VARCHAR(60) | NOT NULL | título curto |
| `descricao` | VARCHAR(140) | NOT NULL | resumo exibido no card |
| `descricao_longa` | VARCHAR(600) | NOT NULL | texto da página de detalhe |
| `pontos` | INT | CHECK (pontos BETWEEN 1 AND 1000) | pontos ganhos ao concluir |
| `dificuldade` | VARCHAR(10) | CHECK (dificuldade IN ('facil','medio','dificil')) | nível de dificuldade |

## Tabela `recompensa`

| Coluna | Tipo | Restrições | Descrição |
|---|---|---|---|
| `id` | BIGINT | PK, auto incremento | identificador da recompensa |
| `nome` | VARCHAR(80) | NOT NULL | nome da recompensa |
| `descricao` | VARCHAR(300) | NOT NULL | descrição completa |
| `icone` | VARCHAR(10) | NOT NULL | emoji da recompensa |
| `categoria` | VARCHAR(20) | CHECK (categoria IN ('energia','transporte','alimentacao','cultura','parceiros')) | categoria do catálogo |
| `custo_pontos` | INT | CHECK (custo_pontos BETWEEN 10 AND 100000) | custo de 1 unidade |
| `estoque` | INT | CHECK (estoque >= 0) | unidades disponíveis |
| `ativa` | BOOLEAN | NOT NULL, DEFAULT TRUE | se pode ser convertida |
| `criada_em` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | data de cadastro |

## Tabela `conversao`

Registra cada vez que um usuário troca pontos por uma recompensa.

| Coluna | Tipo | Restrições | Descrição |
|---|---|---|---|
| `id` | BIGINT | PK, auto incremento | identificador da conversão |
| `usuario_id` | BIGINT | FK → `usuario.id`, NOT NULL | quem converteu |
| `recompensa_id` | BIGINT | FK → `recompensa.id`, NOT NULL | o que foi escolhido |
| `quantidade` | INT | CHECK (quantidade >= 1) | unidades convertidas |
| `pontos_gastos` | INT | NOT NULL | `custo_pontos × quantidade` no momento da conversão |
| `status` | VARCHAR(10) | CHECK (status IN ('pendente','aprovada','cancelada')) | situação do pedido |
| `criada_em` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | data da conversão |

## Relacionamentos

```
usuario 1 ──── N avatar        (um usuário pode ter vários avatares)
usuario 1 ──── N conversao     (um usuário faz várias conversões)
recompensa 1 ── N conversao    (uma recompensa aparece em várias conversões)
```

- `missao` não tem chave estrangeira: ao concluir uma missão, a API soma os `pontos` dela ao usuário.
- O **saldo** (`/usuarios/{id}/saldo`) é calculado: `pontosConvertidos` é a soma de `pontos_gastos` das conversões que não estão canceladas.