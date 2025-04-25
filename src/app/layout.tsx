import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import { Suspense } from "react"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Horo Whisper",
  description: "Whisper from the universe just for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="body-container no-scrollbar">
        <ClientLayout>
          <Suspense>
              {children}
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
