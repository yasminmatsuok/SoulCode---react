import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center pt-32">
      <h1 className="text-5xl font-bold mb-4 highlight">404</h1>
      <p className="text-textSecondary mb-6">Essa página não existe.</p>
      <Link to="/" className="btn-primary">Voltar para o início</Link>
    </main>
  );
}

export default NotFound;
