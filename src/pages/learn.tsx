import { Brain, BookOpen, MessageSquare, ArrowRight } from "lucide-react";
import GameHub from "../games/GameHub";
import { CTASection } from "../components/ui/CTASection"; // Assuming CTASection is imported from this location

export default function Learn() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-green-100 text-green-800 px-6 py-3 rounded-full border border-green-300 font-medium mb-8 shadow-sm">
              <Brain className="inline h-5 w-5 mr-2" />
              Interactive Learning Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Learn About <span className="text-green-600">Chemical Safety</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">Pick a game to practice safe‑living knowledge.</p>

            <GameHub />
          </div>
        </div>
      </section>

      <CTASection 
        title="Ready to Learn More?"
        description="Explore our blog for in‑depth articles and connect with our community."
        primaryAction={{
          text: 'Read Our Blog',
          to: '/blog',
          icon: <BookOpen className="h-5 w-5" />,
          secondaryIcon: <ArrowRight className="h-5 w-5" />,
          variant: 'primary'
        }}
        secondaryAction={{
          text: 'Contact Us',
          to: '/contact',
          icon: <MessageSquare className="h-5 w-5" />,
          variant: 'secondary'
        }}
      />
    </div>
  );
};
