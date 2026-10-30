import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../routes/paths";

function NotFound() {
  const { pathname } = useLocation();

  return (
    <main className="bg-hero min-h-screen flex items-center justify-center text-center px-4 sm:px-8 pt-28 pb-16">
      <div className="max-w-xl">
        <p className="text-7xl sm:text-8xl md:text-9xl font-bold text-brandPrimary mb-4" aria-hidden="true">
          404
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Página não <span className="highlight">encontrada</span>
        </h1>
        <p className="text-textSecondary mb-2">
          O endereço <code className="bg-bgSecondary border border-borderColor rounded px-2 py-0.5 text-sm break-all">{pathname}</code>{" "}
          não existe ou foi removido.
        </p>
        <p className="text-textSecondary mb-8">Que tal voltar e continuar acumulando pontos? 🌱</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={ROUTES.home} className="btn-primary">
            Ir para o início
          </Link>
          <Link to={ROUTES.recompensas} className="btn-secondary">
            Ver recompensas
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
