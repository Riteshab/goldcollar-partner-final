import { useState, useRef, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { X } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [showCallPopup, setShowCallPopup] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError(true);
      setSubmitMessage('Failed to send message. Please try again or email us directly at info@goldcommercial.com.au');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCallClick = (e: React.MouseEvent) => {
    // Check if desktop (screen width >= 768px)
    if (window.innerWidth >= 768) {
      e.preventDefault();
      setShowCallPopup(true);
    }
    // On mobile, let the tel: link work naturally
  };

  const handleMessageInstead = () => {
    setShowCallPopup(false);
    // Scroll to form
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Close popup on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCallPopup(false);
      }
    };
    if (showCallPopup) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showCallPopup]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO
        title="Contact Us"
        description="Get in touch with Gold Commercial. Contact our team for expert advice on commercial property investment, leasing, and management in Melbourne."
        keywords="contact Gold Commercial, commercial real estate contact, property investment consultation, Melbourne property contact"
      />
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Get in <span className="text-[#8b7355]">Touch</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Ready to start your property investment journey? Contact us today for a complimentary consultation.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition"
                  placeholder="John Smith"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition"
                  placeholder="+61 400 000 000"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell us about your investment goals..."
                  required
                />
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-lg ${submitError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#8b7355] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold opacity-90 mb-1">Email</h3>
                <p className="text-lg">hello@goldcollar.com.au</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold opacity-90 mb-1">Phone</h3>
                <p className="text-lg">0424 238 507</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold opacity-90 mb-1">Office</h3>
                <p className="text-lg">Suite 226, 440 Docklands Drive,<br />Docklands, VIC 3008</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Office Hours</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Sunday</span>
                <span>By Appointment</span>
              </div>
            </div>
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern office"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-1">Visit Our Office</h3>
                <p className="text-white/90 text-sm">Schedule an in-person consultation at any of our locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16 bg-[#f5f1ed] rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Prefer to Talk on the Phone?
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Our team is ready to answer your questions and discuss your investment goals. Call us directly for immediate assistance.
        </p>
        <a
          href="tel:0424238507"
          onClick={handleCallClick}
          className="inline-block bg-[#8b7355] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition shadow-lg"
        >
          Call Now: 0424 238 507
        </a>
      </section>

      {/* Desktop Call Popup */}
      {showCallPopup && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCallPopup(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCallPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="bg-[#8b7355]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Now</h3>
              <p className="text-gray-600 mb-6">Ready to discuss your investment goals?</p>

              <div className="bg-[#f5f1ed] rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                <p className="text-2xl font-bold text-[#8b7355]">0424 238 507</p>
              </div>

              <div className="space-y-3">
                <a
                  href="tel:0424238507"
                  className="block w-full bg-[#8b7355] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition shadow-lg"
                >
                  Call Now
                </a>
                <button
                  onClick={handleMessageInstead}
                  className="block w-full bg-white text-[#8b7355] px-6 py-3 rounded-lg font-semibold hover:bg-[#f5f1ed] transition border-2 border-[#8b7355]"
                >
                  Message Instead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
