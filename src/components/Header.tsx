import { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/avatar", label: "Avatar" },
  { to: "/missoes", label: "Missões" },
  { to: "/faq", label: "FAQ" },
  { to: "/integrantes", label: "Integrantes" },
  { to: "/contato", label: "Contato" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-bgPrimary/95 border-b border-borderColor z-50 px-4 sm:px-8 py-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto relative">
        <div className="text-2xl font-bold">
          <span className="text-brandPrimary">Soul</span>Code
        </div>

        <ul className="hidden md:flex gap-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive ? "text-accent" : "text-textSecondary hover:text-accent"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          <span
            className={`block w-6 h-0.5 bg-textPrimary rounded transition-transform ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-textPrimary rounded transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-textPrimary rounded transition-transform ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>

        {isOpen && (
          <ul className="md:hidden flex flex-col gap-4 absolute top-14 left-0 w-full bg-bgSecondary border-b border-borderColor px-8 py-4 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive ? "text-accent" : "text-textSecondary hover:text-accent"
                    }`
                  }
                >
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
