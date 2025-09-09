import React from "react";
import { Brain, BookOpen, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GameHub from "../games/GameHub";

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

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Learn More?</h2>
            <p className="text-xl text-green-100 mb-8">Explore our blog for in‑depth articles and connect with our community.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/blog" className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <BookOpen className="mr-2 h-5 w-5" /> Read Our Blog <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-transparent text-white font-medium rounded-xl border-2 border-white hover:bg-white hover:text-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <MessageSquare className="mr-2 h-5 w-5" /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
