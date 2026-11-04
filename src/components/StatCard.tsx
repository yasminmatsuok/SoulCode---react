interface StatCardProps {
  valor: string;
  label: string;
}

function StatCard({ valor, label }: StatCardProps) {
  return (
    <div className="bg-bgPrimary border border-borderColor rounded-card p-4 sm:p-6 text-center transition-colors hover:border-accent">
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent mb-1 sm:mb-2">{valor}</p>
      <p className="text-textSecondary text-xs sm:text-sm">{label}</p>
    </div>
  );
}

export default StatCard;
