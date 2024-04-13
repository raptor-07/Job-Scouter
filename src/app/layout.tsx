import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Scouter",
  description: "Find the next best job!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
