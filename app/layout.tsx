import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

import Header from "@/components/layout/header";
import AuthProvider from "@/context/SessionContext";
import { CreatorContextProvider } from "@/context/CreatorContext";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "YB Store",
    template: "%s | YB Store",
  },
  description: "Become a better influencer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CreatorContextProvider>
            <Header />
            <Toaster />
            {children}
          </CreatorContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
