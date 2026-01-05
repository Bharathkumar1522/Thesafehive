import { Brain, BookOpen, MessageSquare, ArrowRight, CheckCircle2, Eye, AlertTriangle, Award, XCircle, Search } from "lucide-react";
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
              Curious About <span className="text-green-600">Chemical Safety</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12">Pick a game to practice safe‑living knowledge.</p>

            <GameHub />
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Master Chemical Safety</h2>
              <p className="text-xl text-gray-700">Essential knowledge for protecting your family from harmful chemicals</p>
            </div>

            {/* How to Identify Harmful Products - Card Grid */}
            <div className="mb-20">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">How to Identify Harmful Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {/* Read Labels Carefully */}
                <div className="group bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Eye className="h-8 w-8 md:h-10 md:w-10 text-red-600" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Read Labels Carefully</h4>
                    <ul className="space-y-2 text-sm md:text-base text-gray-600 leading-relaxed">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Look for ingredient lists, not just marketing claims
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Avoid products with "fragrance" or "parfum"
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Watch for long, unpronounceable chemical names
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Check for warning symbols and hazard statements
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Red Flag Ingredients */}
                <div className="group bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <AlertTriangle className="h-8 w-8 md:h-10 md:w-10 text-yellow-600" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Red Flag Ingredients</h4>
                    <ul className="space-y-2 text-sm md:text-base text-gray-600 leading-relaxed">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Parabens (methylparaben, propylparaben)
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Phthalates (DBP, DEHP, DEP)
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Formaldehyde and formaldehyde releasers
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Triclosan and triclocarban
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Look for Certifications */}
                <div className="group bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-8 w-8 md:h-10 md:w-10 text-green-600" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Look for Certifications</h4>
                    <ul className="space-y-2 text-sm md:text-base text-gray-600 leading-relaxed">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        USDA Organic certification
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        EWG Verified™ products
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Cradle to Cradle Certified™
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        GREENGUARD Gold certification
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Research Tools */}
                <div className="group bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="flex flex-col items-center ">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Search className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Research Tools</h4>
                    <ul className="space-y-2 text-sm md:text-base text-gray-600 leading-relaxed">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        EWG's Skin Deep® database
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Think Dirty app for product scanning
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        HEALTHYstuff.org for product testing
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Company websites for full ingredient lists
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Safety Tips - Enhanced Cards */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">Essential Safety Guidelines</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Do's Card */}
                <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <CheckCircle2 className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900">Smart Choices</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Choose fragrance-free products</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Buy organic when possible</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Use glass containers for food</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Ventilate your home regularly</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Make your own cleaners</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Read ingredient lists completely</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Don'ts Card */}
                <div className="group bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-red-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <XCircle className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-gray-900">Avoid These</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Don't trust "natural" labels alone</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Avoid products with long chemical names</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Don't microwave plastic containers</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Avoid antibacterial soaps</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Don't mix cleaning products</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-xl hover:bg-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm md:text-base text-gray-700 font-medium">Avoid aerosol sprays when possible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
          variant: 'secondary',
          className: 'gtm-cta-learn-contact'
        }}
      />
    </div>
  );
};
