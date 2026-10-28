import type { ReactNode } from "react";

type BadgeColor = "blue" | "purple" | "pink" | "green" | "orange" | "red";

const colorClasses: Record<BadgeColor, string> = {
  blue: "bg-pkkc-blue/10 text-pkkc-blue",
  purple: "bg-pkkc-purple/10 text-pkkc-purple",
  pink: "bg-pkkc-pink/10 text-pkkc-pink",
  green: "bg-pkkc-green/10 text-pkkc-green",
  orange: "bg-pkkc-orange/10 text-pkkc-orange",
  red: "bg-pkkc-red/10 text-pkkc-red",
};

export function Badge({
  children,
  color = "blue",
}: {
  children: ReactNode;
  color?: BadgeColor;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
}
