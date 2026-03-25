import type { Metadata } from "next";
import ThemeRegistry from "@/components/theme/ThemeRegistry";
import "./globals.css";
import { NextAuthProvider } from "@/context/NextAuthProvider";

export const metadata: Metadata = {
  title: "IPO Diary Admin",
  description: "IPO Diary Admin using Vuexy design",
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeRegistry>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
