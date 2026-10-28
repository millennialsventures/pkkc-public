import type { Activity } from "@/src/data/activities";
import { Badge } from "@/src/components/ui/Badge";

const icons: Record<string, string> = {
  broom: "🧹",
  home: "🏠",
  ball: "⚽",
  document: "📋",
  book: "📖",
};

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-pkkc-ink/10 bg-white p-6">
      <div className="flex items-center justify-between">
        <span aria-hidden="true" className="text-3xl">
          {icons[activity.icon] ?? "✨"}
        </span>
        <Badge color="orange">Contoh aktiviti</Badge>
      </div>
      <h3 className="text-lg font-semibold text-pkkc-ink">{activity.title}</h3>
      <p className="text-sm text-pkkc-ink/70">{activity.description}</p>
    </div>
  );
}
