import type { CommitteeMember } from "@/src/data/committee";

const levelClasses: Record<CommitteeMember["level"], string> = {
  1: "bg-pkkc-blue text-white",
  2: "bg-pkkc-blue/80 text-white",
  3: "bg-pkkc-blue/40 text-pkkc-ink",
  4: "bg-pkkc-blue/15 text-pkkc-ink",
};

export function OrgCard({ member }: { member: CommitteeMember }) {
  return (
    <div
      className={`w-full flex-col rounded-xl px-4 py-3 text-center shadow-sm md:flex md:w-56 ${levelClasses[member.level]}`}
    >
      <p className="text-sm font-semibold">{member.position}</p>
      <p className="mt-1 text-xs">{member.name}</p>
    </div>
  );
}
