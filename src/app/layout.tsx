import type { Metadata } from "next";
import { Space_Grotesk, Poppins, Bangers } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Friendly Neighborhood Developer | Portfolio",
  description: "I build experiences, not just websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${poppins.variable} ${bangers.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-primary-red selection:text-white">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
