// Usuários e avatares já existem na API Java: estas funções sempre chamam a API real (sem mock).
import { ENDPOINTS } from "../config/endpoints";
import { toAvatar, toUsuario, toUsuarioPayload } from "../mappers/usuarioMapper";
import type { Avatar, AvatarApi, Id, NovoUsuario, Usuario, UsuarioApi } from "../types";
import { api } from "./api";

export async function listarUsuarios(): Promise<Usuario[]> {
  const dados = await api.get<UsuarioApi[]>(ENDPOINTS.usuarios.listar);
  return dados.map(toUsuario);
}

export async function buscarUsuario(id: Id): Promise<Usuario> {
  return toUsuario(await api.get<UsuarioApi>(ENDPOINTS.usuarios.porId(id)));
}

export async function criarUsuario(usuario: NovoUsuario): Promise<Usuario> {
  return toUsuario(await api.post<UsuarioApi>(ENDPOINTS.usuarios.criar, toUsuarioPayload(usuario)));
}

export async function atualizarUsuario(id: Id, usuario: NovoUsuario): Promise<Usuario> {
  return toUsuario(await api.put<UsuarioApi>(ENDPOINTS.usuarios.porId(id), toUsuarioPayload(usuario)));
}

export async function excluirUsuario(id: Id): Promise<void> {
  return api.delete(ENDPOINTS.usuarios.porId(id));
}

export async function listarAvatares(): Promise<Avatar[]> {
  const dados = await api.get<AvatarApi[]>(ENDPOINTS.avatares.listar);
  return dados.map(toAvatar);
}
