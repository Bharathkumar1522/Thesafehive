// src/pages/NotFound.tsx
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-green-50 px-6">
      <div className="max-w-2xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 p-4 rounded-full shadow-inner">
            <AlertTriangle className="h-16 w-16 text-yellow-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-heading font-extrabold text-gray-900 mb-4">
          404 – Page Not Found
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Oops! The page you’re looking for doesn’t exist.  
          It seems this bee flew out of the hive 🐝.  
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/blog"
            className="px-6 py-3 bg-yellow-400 text-gray-900 font-medium rounded-lg hover:bg-yellow-500 transition"
          >
            Explore Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
