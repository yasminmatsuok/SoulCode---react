import type { ReactNode } from "react";

interface BadgeProps {
  cor: string;
  children: ReactNode;
}

function Badge({ cor, children }: BadgeProps) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-pill px-3 py-1 text-xs font-semibold ${cor}`}>{children}</span>
  );
}

export default Badge;
