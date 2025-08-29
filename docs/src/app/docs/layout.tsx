import Sidebar from "@/components/docs/Sidebar";
import MobileNavigation from "@/components/docs/MobileNavigation";

export const metadata = {
  title: {
    default: "Documentation",
    template: "%s - TreeCharts Documentation",
  },
  description:
    "Complete documentation for TreeCharts library. Learn how to create beautiful tree visualizations, org charts, family trees, and hierarchical diagrams with React and JavaScript.",
  keywords: [
    "treecharts documentation",
    "tree visualization tutorial",
    "react tree component guide",
    "org chart documentation",
    "family tree tutorial",
    "tree diagram guide",
    "hierarchical data tutorial",
    "javascript tree library docs",
    "tree visualization examples",
    "tree chart API reference",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "TreeCharts Documentation - Complete Guide",
    description:
      "Complete documentation for TreeCharts library. Learn how to create beautiful tree visualizations, org charts, family trees, and hierarchical diagrams with React and JavaScript.",
    url: "https://treecharts.netlify.app/docs",
    siteName: "TreeCharts",
    images: [
      {
        url: "https://treecharts.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TreeCharts Documentation - Complete Guide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreeCharts Documentation - Complete Guide",
    description:
      "Complete documentation for TreeCharts library. Learn how to create beautiful tree visualizations with React and JavaScript.",
    images: ["https://treecharts.netlify.app/og-image.jpg"],
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 border-r border-base-300 bg-base-50 overflow-hidden">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 overflow-y-auto bg-base-200">
          {/* Mobile Navigation Component */}
          <MobileNavigation />

          <div className="max-w-4xl mx-auto">
            <main className="px-6 py-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
