tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akwa Ibom Revenue Portal",
  description: "LGA Revenue Collection System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
