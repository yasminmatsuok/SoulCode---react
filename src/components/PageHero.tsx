import type { ReactNode } from "react";

interface PageHeroProps {
  titulo: ReactNode;
  subtitulo: string;
  children?: ReactNode;
}

// Cabeçalho padrão das páginas internas (mesma identidade visual em todas)
function PageHero({ titulo, subtitulo, children }: PageHeroProps) {
  return (
    <section className="bg-hero min-h-[32vh] md:min-h-[40vh] flex items-center justify-center text-center px-4 sm:px-8 pt-28 md:pt-32 pb-10 md:pb-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">{titulo}</h1>
        <p className="text-textSecondary text-base sm:text-lg">{subtitulo}</p>
        {children}
      </div>
    </section>
  );
}

export default PageHero;
