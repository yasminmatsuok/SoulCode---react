import PageHero from "../components/PageHero";
import TeamCard from "../components/TeamCard";
import { team } from "../data/team";

function Integrantes() {
  return (
    <main>
      <PageHero
        titulo={
          <>
            Nossa <span className="highlight">Equipe</span>
          </>
        }
        subtitulo="Conheça as pessoas por trás do projeto SoulCode"
      />

      <section className="py-14 md:py-20">
        <div className="container-app grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Integrantes;
