import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Email Signature & QR Code Generator",
  description: "Create professional email signatures with embedded QR codes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
