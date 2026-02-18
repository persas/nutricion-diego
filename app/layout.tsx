import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminProvider } from "@/components/providers/AdminProvider";

export const metadata: Metadata = {
  title: "NutriTrack — Plan Anti-inflamatorio",
  description: "App nutricional personalizada para psoriasis y artritis psoriasica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body>
        <AdminProvider>
          <TooltipProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                {children}
              </main>
            </div>
            <MobileNav />
          </TooltipProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
