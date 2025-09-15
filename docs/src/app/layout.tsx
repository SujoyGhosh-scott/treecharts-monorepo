import "../globals.css";
import { Macondo } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNavigation from "@/components/MobileBottomNavigation";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const macondo = Macondo({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-macondo",
});

export const metadata = {
  title: {
    default: "TreeCharts - Beautiful Tree Visualizations for Web",
    template: "%s | TreeCharts",
  },
  description:
    "A powerful and flexible library for creating beautiful tree visualizations in React and vanilla JavaScript. Build stunning org charts, family trees, and hierarchical diagrams with ease.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "tree visualization",
    "tree charts",
    "hierarchical charts",
    "org chart",
    "family tree",
    "decision tree",
    "mind map",
    "react tree",
    "javascript charts",
    "svg visualization",
    "data visualization",
    "tree diagram",
    "node tree",
    "interactive charts",
    "web components",
    "chart library",
    "visualization library",
    "tree structure",
    "hierarchy visualization",
    "react components",
  ],
  authors: [{ name: "Sujoy Ghosh" }],
  creator: "Sujoy Ghosh",
  publisher: "TreeCharts",
  formatDetection: {
    telephone: false,
    email: true,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://treecharts.netlify.app",
    siteName: "TreeCharts",
    title: "TreeCharts - Beautiful Tree Visualizations for Web",
    description:
      "A powerful and flexible library for creating beautiful tree visualizations in React and vanilla JavaScript. Build stunning org charts, family trees, and hierarchical diagrams with ease.",
    images: [
      {
        url: "https://treecharts.netlify.app/logo1.png",
        width: 1200,
        height: 630,
        alt: "TreeCharts - Beautiful Tree Visualizations for Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TreeCharts - Beautiful Tree Visualizations for Web",
    description:
      "A powerful and flexible library for creating beautiful tree visualizations in React and vanilla JavaScript. Build stunning org charts, family trees, and hierarchical diagrams with ease.",
    images: ["https://treecharts.netlify.app/logo1.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="treecharts" suppressHydrationWarning>
      <body className={`font-br-hendrix ${macondo.variable}`}>
        <Header />
        {children}
        <MobileBottomNavigation />
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-4BKLJ9HHTZ" />
    </html>
  );
}
