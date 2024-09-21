import type { Metadata } from "next";
import "@/css/style.css";
import { font_body } from "@/functions/font";

export const metadata: Metadata = {
  title: "FocalPoint",
  description: "Adicione e marque suas tarefas diárias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={font_body.className}>{children}</body>
    </html>
  );
}
