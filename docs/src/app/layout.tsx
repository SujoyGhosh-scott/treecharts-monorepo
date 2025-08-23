import "../globals.css";

export const metadata = {
  title: {
    default: "TreeCharts - Beautiful Tree Visualizations for Web",
    template: "%s | TreeCharts",
  },
  description:
    "A powerful and flexible library for creating beautiful tree visualizations in React, Angular, Vue, and vanilla JavaScript.",
  keywords: [
    "tree visualization",
    "charts",
    "react",
    "angular",
    "vue",
    "javascript",
    "svg",
    "family tree",
    "org chart",
  ],
  authors: [{ name: "TreeCharts Team" }],
  creator: "TreeCharts Team",
  publisher: "TreeCharts",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://treecharts.dev",
    siteName: "TreeCharts",
    title: "TreeCharts - Beautiful Tree Visualizations for Web",
    description:
      "A powerful and flexible library for creating beautiful tree visualizations in React, Angular, Vue, and vanilla JavaScript.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreeCharts - Beautiful Tree Visualizations for Web",
    description:
      "A powerful and flexible library for creating beautiful tree visualizations in React, Angular, Vue, and vanilla JavaScript.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
