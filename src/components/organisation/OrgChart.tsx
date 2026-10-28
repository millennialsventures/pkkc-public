import type { CommitteeMember } from "@/src/data/committee";
import { OrgCard } from "./OrgCard";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";

function groupByLevel(members: CommitteeMember[]) {
  const levels = [1, 2, 3, 4] as const;
  return levels.map((level) => ({
    level,
    members: members.filter((member) => member.level === level),
  }));
}

export function OrgChart({ members }: { members: CommitteeMember[] }) {
  const groups = groupByLevel(members);

  return (
    <div className="flex flex-col items-center gap-6">
      {groups.map((group, groupIndex) => (
        <div
          key={group.level}
          className="flex w-full flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-center"
        >
          {group.members.map((member, memberIndex) => (
            <RevealOnScroll key={member.id} delay={(groupIndex + memberIndex) * 0.05}>
              <OrgCard member={member} />
            </RevealOnScroll>
          ))}
        </div>
      ))}
    </div>
  );
}
