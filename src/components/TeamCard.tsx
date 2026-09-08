import type { TeamMember } from "../types";

interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="bg-bgSecondary border border-borderColor rounded-[20px] overflow-hidden transition-all hover:-translate-y-1 hover:border-accent">
      <div className="w-full h-48 overflow-hidden bg-bgPrimary flex items-center justify-center">
        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-sm mb-1">{member.name}</h3>
        <p className="text-accent text-sm font-semibold mb-0.5">{member.rm}</p>
        <p className="text-textSecondary text-xs mb-1">{member.turma}</p>
        <p className="text-brandPrimary text-xs font-semibold mb-4">{member.role}</p>
        <div className="flex gap-3">
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            className="bg-bgPrimary border border-brandPrimary text-brandSecondary rounded-pill px-4 py-1 text-xs font-semibold transition-all hover:bg-brandPrimary hover:text-textPrimary"
          >
            GitHub
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="bg-bgPrimary border border-brandPrimary text-brandSecondary rounded-pill px-4 py-1 text-xs font-semibold transition-all hover:bg-brandPrimary hover:text-textPrimary"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
