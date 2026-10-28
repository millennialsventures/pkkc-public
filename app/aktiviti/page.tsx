import type { Metadata } from "next";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { ParallaxBlobs } from "@/src/components/motion/ParallaxBlobs";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";
import { ActivityCard } from "@/src/components/activities/ActivityCard";
import { activities } from "@/src/data/activities";

export const metadata: Metadata = {
  title: "Aktiviti",
  description: "Contoh aktiviti komuniti yang ingin dianjurkan oleh PKKC untuk Cybersouth.",
  alternates: { canonical: "/aktiviti" },
  openGraph: { url: "/aktiviti" },
};

export default function AktivitiPage() {
  return (
    <main className="flex-1">
      <Section className="relative overflow-hidden">
        <ParallaxBlobs />
        <Container className="relative">
          <RevealOnScroll>
            <h1 className="text-3xl font-bold tracking-tight text-pkkc-ink sm:text-4xl">
              Aktiviti
            </h1>
            <p className="mt-4 max-w-2xl text-pkkc-ink/70">
              Contoh aktiviti yang ingin dianjurkan oleh PKKC untuk komuniti
              Cybersouth.
            </p>
          </RevealOnScroll>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <RevealOnScroll key={activity.id} delay={index * 0.05}>
                <ActivityCard activity={activity} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
