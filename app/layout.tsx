import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Corviap Group | Strategic Systems & Digital Growth",
  description:
    "Corviap Group, kurumlarin karmasayi sisteme donusturmesini saglayan danismanlik ve teknoloji grubudur.",
  icons: {
    icon: "/sirket_logo.png",
    shortcut: "/sirket_logo.png",
    apple: "/sirket_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-theme="dark">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
