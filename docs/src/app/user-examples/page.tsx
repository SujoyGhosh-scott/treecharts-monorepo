// app/user-examples/page.tsx
// import GameOfLifeVisualization from "@/components/GameOfLifeVisualization";
import SimpleOrgChart from "@/components/examples/SimpleOrgChart";
import FlowchartExample from "@/components/examples/FlowchartExample";
import OrderProcessingFlowchart from "@/components/examples/OrderProcessingFlowchart";
import FamilyTreeExample from "@/components/examples/FamilyTreeExample";
import EvolutionTreeExample from "@/components/examples/EvolutionTreeExample";
import ProjectStructureExample from "@/components/examples/ProjectStructureExample";
import TournamentBracketExample from "@/components/examples/TournamentBracketExample";
import TrainStationExample from "@/components/examples/TrainStationExample";
import UniversityCourseExample from "@/components/examples/UniversityCourseExample";
import SocialNetworkExample from "@/components/examples/SocialNetworkExample";
import KnowledgeGraphExample from "@/components/examples/KnowledgeGraphExample";
import BasicTreeChart from "@/components/examples/BasicTreeChart";
import NodeWithDescriptionExample from "@/components/examples/NodeWithDescriptionExample";
import InteractiveOrgChart from "@/components/examples/InteractiveOrgChart";

export const metadata = {
  title: "User Examples - TreeCharts",
  description:
    "Explore user-created examples and interactive demonstrations of TreeCharts. Learn how to build different types of tree visualizations with practical examples.",
  keywords: [
    "treecharts user examples",
    "interactive tree examples",
    "custom tree visualizations",
    "treecharts tutorials",
    "tree chart demos",
    "hierarchical data visualization",
    "react tree components",
    "javascript tree examples",
  ],
  authors: [{ name: "Sujoy Ghosh" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "TreeCharts User Examples - Interactive Demonstrations",
    description:
      "Explore user-created examples and interactive demonstrations of TreeCharts. Learn how to build different types of tree visualizations with practical examples.",
    url: "https://treecharts.netlify.app/user-examples",
    siteName: "TreeCharts",
    images: [
      {
        url: "https://treecharts.netlify.app/logo1.png",
        width: 1200,
        height: 630,
        alt: "TreeCharts User Examples - Interactive Demonstrations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreeCharts User Examples - Interactive Demonstrations",
    description:
      "Explore user-created examples and interactive demonstrations of TreeCharts. Learn how to build different types of tree visualizations.",
    images: ["https://treecharts.netlify.app/logo1.png"],
  },
};

export default function UserExamplesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 relative">
      {/* Game of Life Background using GameOfLifeVisualization */}
      {/* <GameOfLifeVisualization
        cellSize={40}
        updateInterval={300}
        initialDensity={0.15}
        deadCellOpacity={0}
        liveCellOpacity={0.06}
        cellColor="255, 255, 255"
        glowEffect={false}
      /> */}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-macondo">
                User Examples
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Interactive demonstrations and practical examples of TreeCharts
                in action. Learn how to create beautiful tree visualizations for
                your own projects.
              </p>
            </div>

            {/* Examples Grid */}
            <div className="grid gap-12">
              {/* Simple Organization Chart Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Simple Organization Chart
                  </h2>
                  <p className="text-gray-300 text-lg">
                    A basic organizational chart showing company hierarchy with
                    clean right-angle connections and professional styling.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <SimpleOrgChart />
                </div>
              </div>

              {/* Flowchart Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    User Login Flowchart
                  </h2>
                  <p className="text-gray-300 text-lg">
                    A decision flowchart demonstrating proper flowchart
                    conventions: ellipses for start/end, rectangles for
                    processes, diamonds for decisions, and labeled edges showing
                    flow conditions.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <FlowchartExample />
                </div>
              </div>

              {/* Order Processing Flowchart Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    E-commerce Order Processing
                  </h2>
                  <p className="text-gray-300 text-lg">
                    A comprehensive business process flowchart showing the
                    complete e-commerce order workflow with multiple decision
                    points, inventory checks, payment processing, and different
                    outcome paths including backorders and cancellations.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <OrderProcessingFlowchart />
                </div>
              </div>

              {/* Family Tree Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Johnson Family Tree
                  </h2>
                  <p className="text-gray-300 text-lg">
                    A traditional family tree showing three generations of the
                    Johnson family. Demonstrates hierarchical relationships with
                    detailed information including birth years and professions,
                    using color coding to distinguish between generations.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <FamilyTreeExample />
                </div>
              </div>

              {/* Evolution Tree Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Human Evolution Tree
                  </h2>
                  <p className="text-gray-300 text-lg">
                    An interactive collapsible tree showing human evolution from
                    our common ancestor with great apes to modern humans. Click
                    the ▼ buttons to expand detailed information about each
                    evolutionary stage and species.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <EvolutionTreeExample />
                </div>
              </div>

              {/* Project Structure Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    React Project Structure
                  </h2>
                  <p className="text-gray-300 text-lg">
                    A visual representation of a modern React application folder
                    structure using custom folder and file icons. Blue folders
                    represent directories, while colored files indicate
                    different file types (React components, HTML, CSS, config
                    files).
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <ProjectStructureExample />
                </div>
              </div>

              {/* Tournament Bracket Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    🏆 World Cup Tournament Bracket
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Track tournament progression through elimination rounds.
                    Gold for the winner, green/blue for advancing teams, and
                    gray for eliminated teams. Shows quarter-finals,
                    semi-finals, and final with match scores and results.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <TournamentBracketExample />
                </div>
              </div>

              {/* Train Station Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    🚇 Metro Line Network
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Visualize train station connections with travel times.
                    Different colored circles represent various districts and
                    station types, with the terminal highlighted as a diamond
                    shape.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <TrainStationExample />
                </div>
              </div>

              {/* University Course Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    🎓 Computer Science Curriculum
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Academic pathway from prerequisites to specializations.
                    Hexagon for degree, rectangles for course groups, diamonds
                    for tracks, and stars for capstone projects.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <UniversityCourseExample />
                </div>
              </div>

              {/* Social Network Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    🌐 Personal Social Network
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Radial visualization of personal connections and
                    relationships. Center node represents the main person with
                    work, family, friends, and professional networks branching
                    out in all directions.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <SocialNetworkExample />
                </div>
              </div>

              {/* Knowledge Graph Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    🧠 AI Knowledge Graph
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Comprehensive AI ecosystem mapped as a radial knowledge
                    graph. Different geometric shapes represent various AI
                    domains, technologies, and their interconnected
                    relationships.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <KnowledgeGraphExample />
                </div>
              </div>

              {/* Basic Tree Chart Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    📊 Basic Tree Chart
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Simple hierarchical tree chart with direct connections and
                    title configuration. Perfect for basic organizational
                    structures or simple hierarchical data visualization.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <BasicTreeChart />
                </div>
              </div>

              {/* Node with Description Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    📝 Nodes with Descriptions
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Enhanced nodes with detailed descriptions for richer
                    information display. Ideal for organizational charts where
                    each role needs additional context and explanation.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <NodeWithDescriptionExample />
                </div>
              </div>

              {/* Interactive Collapsible Chart Example */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    🔄 Interactive Collapsible Chart
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Interactive organization chart with collapsible nodes. Click
                    the expand buttons to reveal detailed descriptions and
                    explore the hierarchical structure dynamically.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <InteractiveOrgChart />
                </div>
              </div>

              {/* More examples will be added here */}
              <div className="text-center py-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/20 text-primary text-lg font-medium backdrop-blur-sm">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  More examples coming soon...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
