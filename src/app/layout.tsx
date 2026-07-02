import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreakingTicker } from "@/components/BreakingTicker";
import { Category } from '@/lib/models';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "NewsPulse - Latest News, Breaking Stories and Comment",
  description: "Stay informed with NewsPulse. Breaking news, latest stories, and in-depth analysis from around the world.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: { id: number; name: string; slug: string }[] = [];
  try {
    const records = await Category.findAll();
    categories = records.map((r: any) => r.get({ plain: true }));
  } catch (err) {
    console.error(err);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Header categories={categories} />
          <BreakingTicker />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
