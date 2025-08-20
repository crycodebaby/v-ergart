import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/providers";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata = {
  title: "Hausmeister Neuss - Alexander Ergart",
  description:
    "Hausmeisterservice in Neuss: Reinigung, Reparaturen & Winterdienst.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${robotoMono.variable} font-sans bg-background text-foreground relative`}
      >
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>

        <ScrollToTopButton />
      </body>
    </html>
  );
}
