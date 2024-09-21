import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      <Image
        src={"/icons/logotype.svg"}
        alt="Logotipo do FocalPoint"
        width={150}
        height={36}
        priority
      />
      <h1>Bem-vindo de volta, Marcus</h1>
      <span>Segunda, 01 de dezembro de 2025</span>
    </header>
  );
}
