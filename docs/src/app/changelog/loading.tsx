import Header from "@/components/Header";

export default function Loading() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="bg-gradient-to-br from-base-300 to-base-100 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Changelog</h1>
              <p className="text-gray-300 text-lg">
                Track all changes, updates, and improvements to TreeCharts
              </p>
            </div>

            {/* Loading Content */}
            <div className="bg-base-200/50 backdrop-blur-sm rounded-lg border border-base-300 p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-600 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-600 rounded w-4/6"></div>
                </div>
                <div className="h-6 bg-gray-600 rounded w-1/2 mt-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
