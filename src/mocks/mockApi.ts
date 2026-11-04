// "Back-end falso" em memória: imita as regras e os status HTTP descritos em docs/CONTRATO_API.md.
// Os dados voltam ao estado inicial quando a página é recarregada.
import type {
  ConversaoApi,
  ConversaoPayload,
  Id,
  MissaoApi,
  MissaoPayload,
  RecompensaApi,
  RecompensaPayload,
  SaldoApi,
  StatusConversao,
} from "../types";
import { erroMock, proximoId, simularRequisicao } from "./mockUtils";
import { CONVERSOES_SEED, MISSOES_SEED, RECOMPENSAS_SEED, SALDO_SEED } from "./seed";

const db = {
  missoes: structuredClone(MISSOES_SEED),
  recompensas: structuredClone(RECOMPENSAS_SEED),
  conversoes: structuredClone(CONVERSOES_SEED),
  saldo: structuredClone(SALDO_SEED),
};

function buscar<T extends { id: Id }>(lista: T[], id: Id, nome: string): T {
  const item = lista.find((registro) => registro.id === Number(id));
  if (!item) throw erroMock(404, `${nome} #${id} não encontrada.`);
  return item;
}

function remover<T extends { id: Id }>(lista: T[], id: Id, nome: string): void {
  const item = buscar(lista, id, nome);
  lista.splice(lista.indexOf(item), 1);
}

function validarMissao(payload: MissaoPayload): void {
  if (!payload.titulo?.trim()) throw erroMock(400, "O título da missão é obrigatório.");
  if (!(payload.pontos > 0)) throw erroMock(400, "A missão precisa valer mais de 0 pontos.");
}

function validarRecompensa(payload: Partial<RecompensaPayload>): void {
  if (payload.nome !== undefined && !payload.nome.trim()) {
    throw erroMock(400, "O nome da recompensa é obrigatório.");
  }
  if (payload.custoPontos !== undefined && !(payload.custoPontos > 0)) {
    throw erroMock(400, "O custo em pontos deve ser maior que 0.");
  }
  if (payload.estoque !== undefined && payload.estoque < 0) {
    throw erroMock(400, "O estoque não pode ser negativo.");
  }
}

function conferirUsuario(usuarioId: Id): void {
  if (Number(usuarioId) !== db.saldo.usuarioId) throw erroMock(404, `Usuário #${usuarioId} não encontrado.`);
}

export const mockMissoes = {
  listar: () => simularRequisicao<MissaoApi[]>(() => db.missoes),

  buscar: (id: Id) => simularRequisicao<MissaoApi>(() => buscar(db.missoes, id, "Missão")),

  criar: (payload: MissaoPayload) =>
    simularRequisicao<MissaoApi>(() => {
      validarMissao(payload);
      const missao = { ...payload, id: proximoId(db.missoes) };
      db.missoes.push(missao);
      return missao;
    }),

  atualizar: (id: Id, payload: MissaoPayload) =>
    simularRequisicao<MissaoApi>(() => {
      validarMissao(payload);
      const missao = buscar(db.missoes, id, "Missão");
      Object.assign(missao, payload);
      return missao;
    }),

  excluir: (id: Id) => simularRequisicao<void>(() => remover(db.missoes, id, "Missão")),

  concluir: (id: Id, usuarioId: Id) =>
    simularRequisicao<SaldoApi>(() => {
      conferirUsuario(usuarioId);
      const missao = buscar(db.missoes, id, "Missão");
      db.saldo.pontosDisponiveis += missao.pontos;
      db.saldo.pontosAcumulados += missao.pontos;
      return db.saldo;
    }),
};

export const mockRecompensas = {
  listar: () => simularRequisicao<RecompensaApi[]>(() => db.recompensas),

  buscar: (id: Id) => simularRequisicao<RecompensaApi>(() => buscar(db.recompensas, id, "Recompensa")),

  criar: (payload: RecompensaPayload) =>
    simularRequisicao<RecompensaApi>(() => {
      validarRecompensa(payload);
      const recompensa = { ...payload, id: proximoId(db.recompensas), criadaEm: new Date().toISOString() };
      db.recompensas.push(recompensa);
      return recompensa;
    }),

  atualizar: (id: Id, payload: RecompensaPayload) =>
    simularRequisicao<RecompensaApi>(() => {
      validarRecompensa(payload);
      const recompensa = buscar(db.recompensas, id, "Recompensa");
      Object.assign(recompensa, payload);
      return recompensa;
    }),

  atualizarParcial: (id: Id, alteracoes: Partial<RecompensaPayload>) =>
    simularRequisicao<RecompensaApi>(() => {
      validarRecompensa(alteracoes);
      const recompensa = buscar(db.recompensas, id, "Recompensa");
      Object.assign(recompensa, alteracoes);
      return recompensa;
    }),

  excluir: (id: Id) => simularRequisicao<void>(() => remover(db.recompensas, id, "Recompensa")),
};

export const mockConversoes = {
  listarPorUsuario: (usuarioId: Id) =>
    simularRequisicao<ConversaoApi[]>(() => {
      conferirUsuario(usuarioId);
      return db.conversoes
        .filter((conversao) => conversao.usuarioId === Number(usuarioId))
        .sort((a, b) => b.criadaEm.localeCompare(a.criadaEm));
    }),

  criar: (payload: ConversaoPayload) =>
    simularRequisicao<ConversaoApi>(() => {
      conferirUsuario(payload.usuarioId);
      const recompensa = buscar(db.recompensas, payload.recompensaId, "Recompensa");
      const { quantidade } = payload;

      if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw erroMock(400, "A quantidade deve ser um número inteiro maior que zero.");
      }
      if (!recompensa.ativa) throw erroMock(400, "Esta recompensa está indisponível no momento.");
      if (recompensa.estoque < quantidade) {
        throw erroMock(400, `Estoque insuficiente: restam ${recompensa.estoque} unidade(s).`);
      }

      const pontosGastos = recompensa.custoPontos * quantidade;
      if (db.saldo.pontosDisponiveis < pontosGastos) {
        throw erroMock(
          400,
          `Saldo insuficiente: você tem ${db.saldo.pontosDisponiveis} pontos e precisa de ${pontosGastos}.`,
        );
      }

      recompensa.estoque -= quantidade;
      db.saldo.pontosDisponiveis -= pontosGastos;
      db.saldo.pontosConvertidos += pontosGastos;

      const conversao: ConversaoApi = {
        id: proximoId(db.conversoes),
        usuarioId: payload.usuarioId,
        recompensaId: recompensa.id,
        recompensaNome: recompensa.nome,
        quantidade,
        pontosGastos,
        status: "pendente",
        criadaEm: new Date().toISOString(),
      };
      db.conversoes.push(conversao);
      return conversao;
    }),

  atualizarStatus: (id: Id, status: StatusConversao) =>
    simularRequisicao<ConversaoApi>(() => {
      const conversao = buscar(db.conversoes, id, "Conversão");
      if (conversao.status !== "pendente") {
        throw erroMock(409, "Somente conversões pendentes podem ser alteradas.");
      }

      if (status === "cancelada") {
        // Estorna os pontos e devolve a recompensa ao estoque
        db.saldo.pontosDisponiveis += conversao.pontosGastos;
        db.saldo.pontosConvertidos -= conversao.pontosGastos;
        const recompensa = db.recompensas.find((item) => item.id === conversao.recompensaId);
        if (recompensa) recompensa.estoque += conversao.quantidade;
      }

      conversao.status = status;
      return conversao;
    }),
};

export const mockSaldo = {
  buscar: (usuarioId: Id) =>
    simularRequisicao<SaldoApi>(() => {
      conferirUsuario(usuarioId);
      return db.saldo;
    }),
};
