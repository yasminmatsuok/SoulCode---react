import TeamCard from "../components/TeamCard";
import { team } from "../data/team";

function Integrantes() {
  return (
    <main>
      <section
        className="min-h-[40vh] flex items-center justify-center text-center px-8 pt-32 pb-16"
        style={{ background: "radial-gradient(ellipse at center, #1a1535 0%, #0A0A0F 70%)" }}
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Nossa <span className="highlight">Equipe</span>
          </h1>
          <p className="text-textSecondary text-lg">Conheça os integrantes do grupo SoulCode</p>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="container-app grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Integrantes;
