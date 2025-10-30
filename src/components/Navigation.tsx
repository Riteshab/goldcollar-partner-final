import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/GC_Logo_Assets.png';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 px-4 sm:px-6 lg:px-8" style={{ marginTop: '24px' }}>
      <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-[#8b7355]/20 shadow-lg max-w-[92%] lg:max-w-[87%] mx-auto">
        <div className="px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 flex-shrink-0 min-w-0">
              <Link to="/" className="relative flex-shrink-0" style={{ marginTop: '-12px', marginBottom: '-12px' }}>
                <img
                  src={logoImage}
                  alt="Gold Collar Partners"
                  className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 object-contain"
                />
              </Link>
              <Link to="/" className="whitespace-nowrap tracking-wide font-cinzel min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline">
                  <span className="text-base sm:text-lg lg:text-[1.625rem] text-gray-900 font-semibold leading-tight">Gold Collar</span>
                  <span className="text-xs sm:text-sm lg:text-base sm:ml-2 text-[#d4a855] font-light">Partners</span>
                </div>
              </Link>
            </div>

            <div className="hidden xl:flex items-center space-x-1 flex-shrink-0">
              <Link to="/about" className="text-gray-700 hover:text-[#8b7355] transition px-2 py-2 text-sm font-medium whitespace-nowrap">About Us</Link>
              <Link to="/services" className="text-gray-700 hover:text-[#8b7355] transition px-2 py-2 text-sm font-medium whitespace-nowrap">Services</Link>
              <Link to="/case-studies" className="text-gray-700 hover:text-[#8b7355] transition px-2 py-2 text-sm font-medium whitespace-nowrap">Case Studies</Link>
              <Link to="/faqs" className="text-gray-700 hover:text-[#8b7355] transition px-2 py-2 text-sm font-medium whitespace-nowrap">FAQs</Link>
              <Link to="/resources" className="text-gray-700 hover:text-[#8b7355] transition px-2 py-2 text-sm font-medium whitespace-nowrap">Resources</Link>
              <Link to="/insights" className="text-gray-700 hover:text-[#8b7355] transition px-2 py-2 text-sm font-medium whitespace-nowrap">Insights</Link>
              <Link to="/contact" className="bg-[#8b7355] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#6d5a42] transition whitespace-nowrap ml-2">Contact Us</Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden text-gray-700 flex-shrink-0 ml-2 p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden bg-white/95 backdrop-blur-sm border-t rounded-b-[24px]">
            <div className="px-4 py-4 space-y-2">
              <Link to="/about" className="block text-gray-700 hover:text-[#8b7355] hover:bg-gray-50 px-3 py-2.5 rounded-lg transition font-medium" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link to="/services" className="block text-gray-700 hover:text-[#8b7355] hover:bg-gray-50 px-3 py-2.5 rounded-lg transition font-medium" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link to="/case-studies" className="block text-gray-700 hover:text-[#8b7355] hover:bg-gray-50 px-3 py-2.5 rounded-lg transition font-medium" onClick={() => setMobileMenuOpen(false)}>Case Studies</Link>
              <Link to="/faqs" className="block text-gray-700 hover:text-[#8b7355] hover:bg-gray-50 px-3 py-2.5 rounded-lg transition font-medium" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
              <Link to="/resources" className="block text-gray-700 hover:text-[#8b7355] hover:bg-gray-50 px-3 py-2.5 rounded-lg transition font-medium" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
              <Link to="/insights" className="block text-gray-700 hover:text-[#8b7355] hover:bg-gray-50 px-3 py-2.5 rounded-lg transition font-medium" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
              <Link to="/contact" className="block bg-[#8b7355] text-white hover:bg-[#6d5a42] px-3 py-2.5 rounded-lg transition font-medium text-center" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
