import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutCTA = () => {
  return (
    <div className="text-center bg-green-50 p-10 rounded-3xl shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Curious About Our Mission?
      </h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
        Learn how we're building a safer, chemical-free world for you and your family.
      </p>
      <Link
        to="/about"
        className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
      >
        Discover Our Mission
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
};

export default AboutCTA;
