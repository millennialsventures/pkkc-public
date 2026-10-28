import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";

export default function NotFound() {
  return (
    <main className="flex-1">
      <Section>
        <Container className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-pkkc-ink sm:text-4xl">
            Halaman Tidak Dijumpai
          </h1>
          <p className="mt-4 text-pkkc-ink/70">
            Maaf, halaman yang anda cari tidak wujud atau telah dipindahkan.
          </p>
          <Link href="/" className="mt-6 inline-block font-medium text-pkkc-blue hover:underline">
            Laman Utama
          </Link>
        </Container>
      </Section>
    </main>
  );
}
