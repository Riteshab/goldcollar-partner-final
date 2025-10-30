import { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';

export function SubmitReview() {
  const [formData, setFormData] = useState({
    customer_name: '',
    address: '',
    property_type: '',
    review_text: ''
  });
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const propertyTypes = [
    'Residential - House',
    'Residential - Apartment',
    'Residential - Townhouse',
    'Commercial Property',
    'Investment Property',
    'Development Project',
    'Land Purchase',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a star rating');
      return;
    }

    if (!formData.customer_name || !formData.address || !formData.property_type || !formData.review_text) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: submitError } = await supabase
        .from('reviews')
        .insert([
          {
            customer_name: formData.customer_name,
            address: formData.address,
            property_type: formData.property_type,
            review_text: formData.review_text,
            rating: rating,
            status: 'pending'
          }
        ]);

      if (submitError) throw submitError;

      setSubmitted(true);
      setFormData({
        customer_name: '',
        address: '',
        property_type: '',
        review_text: ''
      });
      setRating(0);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f1ed] to-white flex items-center justify-center px-4 py-20">
        <SEO
          title="Review Submitted"
          description="Thank you for your review"
        />
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Your review has been submitted successfully and is pending approval. We truly appreciate you taking the time to share your experience with Gold Collar Partners.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[#8b7355] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition"
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1ed] to-white py-20 px-4">
      <SEO
        title="Submit Your Review"
        description="Share your experience with Gold Collar Partners"
      />
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] p-8 text-white text-center">
            <h1 className="text-4xl font-bold mb-3">Share Your Experience</h1>
            <p className="text-white/90 text-lg">
              We'd love to hear about your journey with Gold Collar Partners
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label htmlFor="customer_name" className="block text-sm font-semibold text-gray-900 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#8b7355] focus:ring-0 transition"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
                Property Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#8b7355] focus:ring-0 transition"
                placeholder="e.g., Melbourne, VIC"
              />
            </div>

            <div>
              <label htmlFor="property_type" className="block text-sm font-semibold text-gray-900 mb-2">
                Property Type *
              </label>
              <select
                id="property_type"
                name="property_type"
                value={formData.property_type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#8b7355] focus:ring-0 transition"
              >
                <option value="">Select property type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Your Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'fill-[#d4a855] text-[#d4a855]'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="review_text" className="block text-sm font-semibold text-gray-900 mb-2">
                Your Review *
              </label>
              <textarea
                id="review_text"
                name="review_text"
                value={formData.review_text}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#8b7355] focus:ring-0 transition resize-none"
                placeholder="Share your experience with Gold Collar Partners..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#8b7355] to-[#6d5a42] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Your review will be reviewed by our team before appearing on the website.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
