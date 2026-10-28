import Image from "next/image";
import Link from "next/link";
import { Container } from "@/src/components/ui/Container";

const links: { label: string; href: string }[] = [
  { label: "Laman Utama", href: "/" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Carta Organisasi", href: "/organisasi" },
  { label: "Aktiviti", href: "/aktiviti" },
  { label: "Aplikasi Mudah Alih", href: "/aplikasi" },
];

export function NavBar() {
  return (
    <nav className="border-b border-pkkc-ink/10 bg-pkkc-bg">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo PKKC" width={40} height={40} />
          <span className="font-semibold text-pkkc-ink">PKKC</span>
        </Link>
        <ul className="flex flex-wrap items-center gap-4 text-sm font-medium text-pkkc-ink">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-pkkc-blue">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
