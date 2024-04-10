import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import logo from "../app/assets/logo.png";

const inter = Inter({ subsets: ["latin"] });

interface Icon {
  url: string;
  alt: string;
}

// Define the icon object using the logo URL
const logoIcon: Icon = {
  url: logo.src,
  alt: "Weather Forecast Website Logo",
};

export const metadata: Metadata = {
  title: "Infinite Scroll Weather Forecast",
  description: "Created by Divin Dass",
  icons: [logoIcon], // Ensure logoIcon is used instead of logo directly
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}