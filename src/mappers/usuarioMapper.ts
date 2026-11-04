import type { Avatar, AvatarApi, NovoUsuario, Usuario, UsuarioApi, UsuarioPayload } from "../types";

// O senhaHash que vem da API é descartado aqui e nunca chega aos componentes
export function toUsuario(dto: UsuarioApi): Usuario {
  return {
    id: Number(dto.id),
    nome: dto.nome,
    email: dto.email,
    idade: Number(dto.idade) || 0,
    cidade: dto.cidade ?? "",
    interesse: dto.interesse ?? "",
    pontos: Number(dto.pontos) || 0,
  };
}

export function toUsuarioPayload(usuario: NovoUsuario): UsuarioPayload {
  return {
    nome: usuario.nome.trim(),
    email: usuario.email.trim().toLowerCase(),
    senha: usuario.senha,
    idade: Number(usuario.idade),
    cidade: usuario.cidade.trim(),
    interesse: usuario.interesse,
  };
}

export function toAvatar(dto: AvatarApi): Avatar {
  return {
    id: Number(dto.id),
    nome: dto.nome,
    nivel: Number(dto.nivel) || 1,
    usuarioId: dto.usuario ? Number(dto.usuario.id) : null,
    usuarioNome: dto.usuario?.nome ?? null,
  };
}
