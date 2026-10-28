import { Container } from "@/src/components/ui/Container";
import { orgInfo } from "@/src/data/orgInfo";

export function Footer() {
  return (
    <footer className="border-t border-pkkc-ink/10 bg-pkkc-bg">
      <Container className="py-10 text-sm text-pkkc-ink/80">
        <p className="font-semibold text-pkkc-ink">{orgInfo.name}</p>
        <p>No. Pendaftaran: {orgInfo.registrationNumber}</p>
        <p>Tarikh Pendaftaran: {orgInfo.registeredDate}</p>
        <p>{orgInfo.address}</p>
      </Container>
    </footer>
  );
}
