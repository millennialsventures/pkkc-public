import type { Activity } from "@/src/data/activities";
import { Badge } from "@/src/components/ui/Badge";

const iconColorClasses: Record<string, string> = {
  broom: "text-pkkc-green",
  home: "text-pkkc-pink",
  ball: "text-pkkc-orange",
  document: "text-pkkc-blue",
  book: "text-pkkc-purple",
};

const iconPaths: Record<string, string> = {
  broom: "M4 20l6-6M14 4l6 6-9 9-6-3 9-12z",
  home: "M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9z",
  ball: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c3 2.5 3 17.5 0 20M12 2c-3 2.5-3 17.5 0 20",
  document: "M6 2h9l3 3v17H6V2zM15 2v3h3M9 10h6M9 14h6M9 18h4",
  book: "M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4V4zM20 4h-7a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h7V4z",
};

export function ActivityCard({ activity }: { activity: Activity }) {
  const colorClass = iconColorClasses[activity.icon] ?? "text-pkkc-blue";
  const path = iconPaths[activity.icon] ?? iconPaths.document;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-pkkc-ink/10 bg-white p-6">
      <div className="flex items-center justify-between">
        <svg
          aria-hidden="true"
          className={`h-8 w-8 ${colorClass}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={path} />
        </svg>
        <Badge color="orange">Contoh aktiviti</Badge>
      </div>
      <h3 className="text-lg font-semibold text-pkkc-ink">{activity.title}</h3>
      <p className="text-sm text-pkkc-ink/70">{activity.description}</p>
    </div>
  );
}
