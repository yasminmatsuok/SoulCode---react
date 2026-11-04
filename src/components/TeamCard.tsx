import type { TeamMember } from "../types";

interface TeamCardProps {
  member: TeamMember;
}

const linkClass =
  "bg-bgPrimary border border-brandPrimary text-brandSecondary rounded-pill px-4 py-1.5 text-xs font-semibold transition-all hover:bg-brandPrimary hover:text-textPrimary";

function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="bg-bgSecondary border border-borderColor rounded-[20px] overflow-hidden transition-all hover:-translate-y-1 hover:border-accent">
      <div className="w-full h-64 sm:h-56 lg:h-64 xl:h-72 overflow-hidden bg-bgPrimary">
        <img
          src={member.photo}
          alt={`Foto de ${member.name}`}
          loading="lazy"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-bold text-base mb-1">{member.name}</h3>
        <p className="text-accent text-sm font-semibold mb-0.5">{member.rm}</p>
        <p className="text-textSecondary text-xs mb-1">{member.turma}</p>
        <p className="text-brandSecondary text-xs font-semibold mb-4">{member.role}</p>
        <div className="flex gap-3">
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub de ${member.name} (abre em nova aba)`}
            className={linkClass}
          >
            GitHub
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`LinkedIn de ${member.name} (abre em nova aba)`}
            className={linkClass}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
}

export default TeamCard;
