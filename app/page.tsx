import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { Button } from "@/src/components/ui/Button";
import { ParallaxBlobs } from "@/src/components/motion/ParallaxBlobs";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";
import { orgInfo } from "@/src/data/orgInfo";

const previews = [
  {
    title: "Jawatankuasa Kami",
    description: "Kenali ahli jawatankuasa yang menerajui PKKC.",
    href: "/organisasi",
    linkLabel: "Carta Organisasi",
  },
  {
    title: "Aktiviti Komuniti",
    description: "Lihat contoh aktiviti yang dijalankan bersama komuniti.",
    href: "/aktiviti",
    linkLabel: "Aktiviti",
  },
  {
    title: "Aplikasi Mudah Alih",
    description: "Aplikasi rasmi PKKC akan datang tidak lama lagi.",
    href: "/aplikasi",
    linkLabel: "Aplikasi Mudah Alih",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <Section className="relative overflow-hidden">
        <ParallaxBlobs />
        <Container className="relative text-center">
          <h1 className="text-4xl font-bold tracking-tight text-pkkc-ink sm:text-5xl">
            Bersama Membina Komuniti Cybersouth
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-pkkc-ink/70">
            PKKC menghubungkan penduduk Cybersouth melalui aktiviti, perkhidmatan,
            dan sokongan komuniti yang telus dan berdaftar.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/tentang">Ketahui Lagi</Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <RevealOnScroll>
            <div className="rounded-2xl border border-pkkc-ink/10 bg-white px-6 py-4 text-center text-sm text-pkkc-ink/70">
              Berdaftar rasmi — No. Pendaftaran {orgInfo.registrationNumber} ·{" "}
              {orgInfo.registeredDate}
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 sm:grid-cols-3">
          {previews.map((preview) => (
            <RevealOnScroll key={preview.href}>
              <Link
                href={preview.href}
                className="block rounded-2xl border border-pkkc-ink/10 bg-white p-6 transition-colors hover:border-pkkc-blue"
              >
                <h2 className="text-lg font-semibold text-pkkc-ink">{preview.linkLabel}</h2>
                <p className="mt-2 text-sm text-pkkc-ink/70">{preview.description}</p>
              </Link>
            </RevealOnScroll>
          ))}
        </Container>
      </Section>
    </main>
  );
}
