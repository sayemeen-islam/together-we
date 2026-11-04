import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TogetherWe | Make a Difference Together",
  description:
    "TogetherWe is a community-driven platform where people discover, create, and join social development events to make a positive impact together.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <TooltipProvider>
          {" "}
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </TooltipProvider>
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
