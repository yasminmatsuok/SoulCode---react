import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../routes/navigation";
import { ROUTES } from "../routes/paths";
import SaldoChip from "./SaldoChip";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-medium transition-colors rounded ${isActive ? "text-accent" : "text-textSecondary hover:text-accent"}`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const [rotaAnterior, setRotaAnterior] = useState(pathname);

  // Fecha o menu mobile sempre que a rota muda
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    const fecharComEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", fecharComEsc);
    return () => window.removeEventListener("keydown", fecharComEsc);
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 w-full bg-bgPrimary/95 backdrop-blur border-b border-borderColor z-50 px-4 sm:px-8 py-3 sm:py-4">
      <nav aria-label="Menu principal" className="flex justify-between items-center gap-4 max-w-6xl mx-auto relative">
        <Link to={ROUTES.home} className="text-xl sm:text-2xl font-bold shrink-0 rounded">
          <span className="text-brandPrimary">Soul</span>Code
        </Link>

        <ul className="hidden xl:flex gap-5 text-sm list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === ROUTES.home} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <SaldoChip />
          <button
            type="button"
            className="xl:hidden flex flex-col justify-center gap-1.5 w-10 h-10 items-center rounded-lg"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
          >
            <span
              className={`block w-6 h-0.5 bg-textPrimary rounded transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block w-6 h-0.5 bg-textPrimary rounded transition-opacity ${isOpen ? "opacity-0" : ""}`} />
            <span
              className={`block w-6 h-0.5 bg-textPrimary rounded transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>

        {isOpen && (
          <ul
            id="menu-mobile"
            className="xl:hidden grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 absolute top-full mt-3 -mx-4 sm:-mx-8 left-0 right-0 bg-bgSecondary border-b border-borderColor px-6 sm:px-8 py-5 list-none animate-slide-in"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === ROUTES.home} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
