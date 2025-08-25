import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100">
      <Header />
      <Hero />
      <Features />
    </main>
  );
}
