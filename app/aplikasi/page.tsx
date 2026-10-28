import type { Metadata } from "next";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { Badge } from "@/src/components/ui/Badge";
import { ParallaxBlobs } from "@/src/components/motion/ParallaxBlobs";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";
import { appFeatures } from "@/src/data/appFeatures";

export const metadata: Metadata = {
  title: "Aplikasi Mudah Alih",
  description: "Aplikasi rasmi PKKC akan datang — ketahui ciri-ciri yang bakal ditawarkan.",
  alternates: { canonical: "/aplikasi" },
  openGraph: { url: "/aplikasi" },
};

export default function AplikasiPage() {
  return (
    <main className="flex-1">
      <Section className="relative overflow-hidden">
        <ParallaxBlobs />
        <Container className="relative">
          <RevealOnScroll>
            <Badge color="purple">Akan Datang</Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-pkkc-ink sm:text-4xl">
              Aplikasi Mudah Alih PKKC
            </h1>
            <p className="mt-4 max-w-2xl text-pkkc-ink/70">
              Aplikasi rasmi PKKC sedang dibangunkan untuk memudahkan penduduk
              Cybersouth berhubung dengan komuniti.
            </p>
          </RevealOnScroll>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {appFeatures.map((feature, index) => (
              <RevealOnScroll key={feature.id} delay={index * 0.05}>
                <div className="rounded-2xl border border-pkkc-ink/10 bg-white p-6">
                  <h2 className="text-lg font-semibold text-pkkc-ink">{feature.title}</h2>
                  <p className="mt-2 text-sm text-pkkc-ink/70">{feature.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
