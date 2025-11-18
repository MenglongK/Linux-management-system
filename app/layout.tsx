import type { Metadata } from "next";
import { Inter, Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { MainLayout } from "@/components/main-layout/MainLayout";

const kantumruyPro = Kantumruy_Pro({
  variable: "--font-kh",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-en",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "System Management",
  description: "System Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </head>
      <body
        className={`${kantumruyPro.variable} ${inter.variable} antialiased`}
      >
        <div className="font-en">
          <MainLayout>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </MainLayout>
        </div>
      </body>
    </html>
  );
}
