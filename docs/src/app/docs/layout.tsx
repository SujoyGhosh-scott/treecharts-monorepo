import Sidebar from "@/components/docs/Sidebar";
import DocsNavigation from "@/components/docs/DocsNavigation";
import Header from "@/components/Header";
import MobileNavigation from "@/components/docs/MobileNavigation";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <Header />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 border-r border-base-300 bg-base-50 overflow-hidden">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          {/* Mobile Navigation Component */}
          <MobileNavigation />

          <div className="max-w-4xl mx-auto">
            <main className="px-6 py-8">{children}</main>

            {/* Navigation */}
            <DocsNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}
