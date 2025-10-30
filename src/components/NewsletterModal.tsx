import { X, Download, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl?: string;
}

export function NewsletterModal({ isOpen, onClose, downloadUrl }: NewsletterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            status: 'active'
          }
        ]);

      if (dbError) {
        if (dbError.code === '23505') {
          setError('This email is already subscribed to our newsletter.');
        } else {
          setError('Failed to subscribe. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);

      if (downloadUrl) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '' });
        setError('');
        onClose();
      }, 2500);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {!isSubmitted ? (
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="bg-[#8b7355]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-[#8b7355]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Resource</h2>
              <p className="text-gray-600">
                Expand your property knowledge with our expert insights. Share your email to access valuable resources.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="newsletter-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="newsletter-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent outline-none transition"
                  placeholder="your.email@example.com"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#8b7355] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Get Free Resource'}
                {!isSubmitting && <Download className="ml-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Starting!</h3>
            <p className="text-gray-600">
              Thank you! Your download will begin shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
