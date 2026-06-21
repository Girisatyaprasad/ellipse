import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ellipse",
  description: "Organizational intelligence workspace",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">{children}</body>
    </html>
  );
}
