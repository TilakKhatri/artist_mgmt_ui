import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import GlobalProvider from "@/global-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artist management",
  description: "Admin panel for artist management",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
