import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";
import { OrgChart } from "@/src/components/organisation/OrgChart";
import { committee } from "@/src/data/committee";

export default function OrganisasiPage() {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <RevealOnScroll>
            <h1 className="text-3xl font-bold tracking-tight text-pkkc-ink sm:text-4xl">
              Jawatankuasa PKKC
            </h1>
          </RevealOnScroll>
          <div className="mt-10">
            <OrgChart members={committee} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
