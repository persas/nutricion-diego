import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nutrición — Plan Anti-inflamatorio",
  description: "Dashboard nutricional personalizado para psoriasis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
