import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MP Knowledge Base",
  description: "Osobní studijní databáze enterprise infrastruktury pro roli SDM a PM.",
  applicationName: "MP Knowledge Base",
  appleWebApp: { capable: true, title: "MP KB", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#087fc5",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="cs"><body>{children}</body></html>;
}
