import { Link } from "react-router-dom";
import { ROUTES } from "../routes/paths";

const LINKS = [
  { to: ROUTES.recompensas, label: "Recompensas" },
  { to: ROUTES.converter, label: "Converter pontos" },
  { to: ROUTES.faq, label: "FAQ" },
  { to: ROUTES.contato, label: "Contato" },
];

function Footer() {
  return (
    <footer className="border-t border-borderColor px-4 sm:px-8 py-8 text-textSecondary text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p>© 2026 SoulCode — FIAP Challenge</p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 list-none">
          {LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="hover:text-accent transition-colors rounded">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
