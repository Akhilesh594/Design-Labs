import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignLab — LLD Practice",
  description: "Practice low-level design with guided problems, focused feedback, and a history of your progress.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
