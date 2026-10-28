import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { Badge } from "@/src/components/ui/Badge";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";
import { orgInfo } from "@/src/data/orgInfo";
import { taman } from "@/src/data/taman";

export default function TentangPage() {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <RevealOnScroll>
            <h1 className="text-3xl font-bold tracking-tight text-pkkc-ink sm:text-4xl">
              Tentang Kami
            </h1>
            <p className="mt-4 max-w-2xl text-pkkc-ink/70">
              PKKC ditubuhkan untuk menyatukan penduduk Cybersouth, menggalakkan
              penyertaan komuniti, dan menjadi suara bersama bagi kesejahteraan
              kawasan kejiranan.
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section>
        <Container>
          <RevealOnScroll>
            <div className="rounded-2xl border border-pkkc-ink/10 bg-white p-6">
              <h2 className="text-xl font-semibold text-pkkc-ink">
                Bukti Pendaftaran
              </h2>
              <p className="mt-2 text-sm text-pkkc-ink/70">
                No. Pendaftaran: {orgInfo.registrationNumber}
              </p>
              <p className="text-sm text-pkkc-ink/70">
                Tarikh Pendaftaran: {orgInfo.registeredDate}
              </p>
              <p className="text-sm text-pkkc-ink/70">{orgInfo.address}</p>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section>
        <Container>
          <RevealOnScroll>
            <h2 className="text-xl font-semibold text-pkkc-ink">
              Kawasan Liputan
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {taman.map((name) => (
                <Badge key={name}>{name}</Badge>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </Section>
    </main>
  );
}
