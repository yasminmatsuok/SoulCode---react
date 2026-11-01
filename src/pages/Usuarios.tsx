import { useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../components/Badge";
import DataState from "../components/DataState";
import PageHero from "../components/PageHero";
import UsuarioCard from "../components/UsuarioCard";
import { useFetch } from "../hooks/useFetch";
import { buildPath, ROUTES } from "../routes/paths";
import { listarAvatares, listarUsuarios } from "../services/usuarioService";
import type { Usuario } from "../types";
import { inputClass } from "../utils/formStyles";

type Ordenacao = "nome" | "mais-pontos" | "recentes";

const ORDENAR: Record<Ordenacao, (a: Usuario, b: Usuario) => number> = {
  nome: (a, b) => a.nome.localeCompare(b.nome),
  "mais-pontos": (a, b) => b.pontos - a.pontos,
  recentes: (a, b) => b.id - a.id,
};

// Aviso exibido no loading: o servidor gratuito pode estar "dormindo"
const LOADING_API = "Conectando à API Java... a primeira requisição pode levar até 1 minuto.";

function Usuarios() {
  const { data: usuarios, status, error, recarregar } = useFetch(listarUsuarios);
  const avatares = useFetch(listarAvatares);
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("nome");

  const termo = busca.trim().toLowerCase();
  const visiveis = (usuarios ?? [])
    .filter((u) => !termo || u.nome.toLowerCase().includes(termo) || u.email.toLowerCase().includes(termo))
    .sort(ORDENAR[ordenacao]);

  return (
    <main>
      <PageHero
        titulo={
          <>
            Comunidade <span className="highlight">SoulCode</span>
          </>
        }
        subtitulo="Usuários e avatares cadastrados na nossa API Java"
      >
        <p className="mt-6 inline-flex items-center gap-2 bg-bgSecondary/80 border border-borderColor rounded-pill px-5 py-2 text-sm sm:text-base">
          <span aria-hidden="true">🟢</span> Dados em tempo real da API
        </p>
      </PageHero>

      <section className="py-12 md:py-16">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="section-title mb-0">
              Usuários <span className="highlight">cadastrados</span>
            </h2>
            <Link to={ROUTES.usuarioNovo} className="btn-primary self-start md:self-auto">
              + Novo usuário
            </Link>
          </div>

          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-bgSecondary border border-borderColor rounded-card p-4 sm:p-5"
          >
            <div>
              <label htmlFor="busca" className="block text-xs text-textSecondary mb-1">
                Buscar
              </label>
              <input
                id="busca"
                type="search"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Nome ou e-mail"
                className={inputClass(false)}
              />
            </div>
            <div>
              <label htmlFor="ordenacao" className="block text-xs text-textSecondary mb-1">
                Ordenar por
              </label>
              <select
                id="ordenacao"
                value={ordenacao}
                onChange={(event) => setOrdenacao(event.target.value as Ordenacao)}
                className={inputClass(false)}
              >
                <option value="nome">Nome (A-Z)</option>
                <option value="mais-pontos">Mais pontos</option>
                <option value="recentes">Cadastro mais recente</option>
              </select>
            </div>
          </form>

          <DataState
            status={status}
            error={error}
            onRetry={recarregar}
            loadingLabel={LOADING_API}
            empty={{
              titulo: "Nenhum usuário cadastrado",
              mensagem: "A API ainda não tem usuários. Cadastre o primeiro!",
              acao: (
                <Link to={ROUTES.usuarioNovo} className="btn-primary">
                  Cadastrar usuário
                </Link>
              ),
            }}
          >
            {visiveis.length === 0 ? (
              <p className="text-center text-textSecondary py-10">Nenhum usuário encontrado com essa busca.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {visiveis.map((usuario) => (
                  <UsuarioCard key={usuario.id} usuario={usuario} />
                ))}
              </div>
            )}
          </DataState>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-bgSecondary/40">
        <div className="container-app">
          <h2 className="section-title">
            Avatares <span className="highlight">criados</span>
          </h2>
          <DataState
            status={avatares.status}
            error={avatares.error}
            onRetry={avatares.recarregar}
            loadingLabel="Carregando avatares..."
            empty={{ titulo: "Nenhum avatar criado", mensagem: "Os avatares aparecem aqui assim que forem criados na API." }}
          >
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(avatares.data ?? []).map((avatar) => (
                <li
                  key={avatar.id}
                  className="flex items-center gap-4 bg-bgSecondary border border-borderColor rounded-card p-5"
                >
                  <span className="text-4xl" aria-hidden="true">
                    🤖
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{avatar.nome}</p>
                    {avatar.usuarioId !== null ? (
                      <Link
                        to={buildPath.usuarioDetalhe(avatar.usuarioId)}
                        className="text-sm text-textSecondary hover:text-accent rounded"
                      >
                        de {avatar.usuarioNome}
                      </Link>
                    ) : (
                      <p className="text-sm text-textSecondary">Sem usuário vinculado</p>
                    )}
                  </div>
                  <Badge cor="bg-brandPrimary/20 text-brandSecondary">Nível {avatar.nivel}</Badge>
                </li>
              ))}
            </ul>
          </DataState>
        </div>
      </section>
    </main>
  );
}

export default Usuarios;
