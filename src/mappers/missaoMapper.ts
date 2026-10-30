import type { Missao, MissaoApi, MissaoPayload, NovaMissao } from "../types";

export function toMissao(dto: MissaoApi): Missao {
  return {
    id: Number(dto.id),
    icone: dto.icone || "🌍",
    titulo: dto.titulo,
    descricao: dto.descricao,
    descricaoLonga: dto.descricaoLonga ?? dto.descricao,
    pontos: Number(dto.pontos),
    dificuldade: dto.dificuldade,
  };
}

export function toMissaoPayload(missao: NovaMissao): MissaoPayload {
  return {
    icone: missao.icone,
    titulo: missao.titulo.trim(),
    descricao: missao.descricao.trim(),
    descricaoLonga: missao.descricaoLonga.trim(),
    pontos: Number(missao.pontos),
    dificuldade: missao.dificuldade,
  };
}
