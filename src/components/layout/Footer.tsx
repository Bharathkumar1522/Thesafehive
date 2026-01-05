import { Link } from 'react-router-dom';
import { Leaf, Mail, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-green-600 mb-4">
              <Leaf className="h-8 w-8" />
              <span className="font-bold text-xl">TheSafeHive</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Helping individuals and families choose safe, non-toxic alternatives for everyday life.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/thesafehive" target="_blank" rel="noopener noreferrer" className="gtm-social-instagram text-gray-500 hover:text-green-600 transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/company/thesafehive" target="_blank" rel="noopener noreferrer" className="gtm-social-linkedin text-gray-500 hover:text-green-600 transition-colors ml-4" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            </div>
          </div>

          {/* Pages Section */}
          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-green-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-gray-600 hover:text-green-600 transition-colors">
                  Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-green-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-600 hover:text-green-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-600 hover:text-green-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-600">
            &copy; {currentYear} TheSafeHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
