import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { PreferencesProvider } from "@/components/providers/PreferencesProvider";
import { ToastContainer } from 'react-toastify';
const robotoHeading = Roboto({subsets:['latin'],variable:'--font-heading'});

import { SessionProvider } from "next-auth/react"
import SessProviser from "@/Providers/SessProviser";
import TanProviders from "@/components/providers/TanProvider";
const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "freshCart | Fresh choices every day",
  description: "Shop everyday essentials and fresh favorites with freshCart.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, robotoHeading.variable)}
    >
      <body className="min-h-screen justify-between flex flex-col">
        <TanProviders>
        <PreferencesProvider>
          <ToastContainer></ToastContainer>
          <SessProviser>
          <Navbar  />
          {children}
          <Footer />
          </SessProviser>
        </PreferencesProvider>
        </TanProviders>
      </body>
    </html>
  );
}


