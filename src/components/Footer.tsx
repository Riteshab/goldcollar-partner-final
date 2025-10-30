import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import logoImage from '../assets/GC_Logo_Assets.png';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-3">
              <img
                src={logoImage}
                alt="Gold Collar Partners"
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              />
              <span className="font-semibold font-cinzel">
                <span className="text-base sm:text-lg text-white">Gold Collar</span>
                <span className="text-xs sm:text-sm text-[#d4a855]"> Partners</span>
              </span>
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              We help individuals and design bespoke investment roadmaps that build generational wealth and achieve financial independence.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Services</h4>
            <ul className="space-y-1.5 text-white/60 text-xs">
              <li><Link to="/services" className="hover:text-white transition">Buyers Advocacy</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Property Development Consulting</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Gold Collar Club</Link></li>
              <li><Link to="/submit-review" className="hover:text-white transition">Submit Review</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-1.5 text-white/60 text-xs">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition">Case Studies</Link></li>
              <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
              <li><Link to="/resources" className="hover:text-white transition">Resources</Link></li>
              <li><Link to="/insights" className="hover:text-white transition">Insights</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Contact</h4>
            <p className="text-white/60 text-xs leading-relaxed">
              Office: Suite 226, 440 Docklands Drive,<br />
              Docklands, VIC 3008<br />
              Email: hello@goldcollar.com.au<br />
              Phone: 0424 238 507
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-6 pt-6 flex flex-col sm:flex-row justify-center items-center gap-3 text-white/50 text-xs">
          <p>&copy; 2025 <span className="font-cinzel">Gold Collar Partners</span>. All rights reserved.</p>
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1 text-white/30 hover:text-white/50 transition-colors"
          >
            <Settings className="w-3 h-3" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
