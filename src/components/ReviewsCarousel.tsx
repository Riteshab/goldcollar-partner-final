import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Review {
  id: string;
  customer_name: string;
  address: string;
  property_type: string;
  review_text: string;
  rating: number;
  approved_at: string;
}

export function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('approved_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      if (data && data.length > 0) {
        setReviews([...data, ...data]);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-[#d4a855] text-[#d4a855]' : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-[#f8f6f3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-[#8b7355]">Clients Say</span>
            </h2>
            <p className="text-gray-700">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#f8f6f3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-[#8b7355]">Clients Say</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Real experiences from real clients who trusted us with their property journey
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f8f6f3] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f8f6f3] to-transparent z-10"></div>

        <div className="reviews-scroll-container">
          <div className="reviews-scroll-content">
            {reviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="review-card flex-shrink-0 w-[420px] mx-3"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {review.customer_name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{review.address}</p>
                      <span className="inline-block px-3 py-1 bg-[#8b7355]/10 text-[#8b7355] text-xs font-semibold rounded-full">
                        {review.property_type}
                      </span>
                    </div>
                    <Quote className="w-10 h-10 text-[#8b7355]/20 flex-shrink-0" />
                  </div>

                  <div className="mb-4">
                    {renderStars(review.rating)}
                  </div>

                  <p className="text-gray-700 leading-relaxed text-sm line-clamp-4">
                    {review.review_text}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      {new Date(review.approved_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .reviews-scroll-container {
          display: flex;
          overflow: hidden;
        }

        .reviews-scroll-content {
          display: flex;
          animation: scroll 40s linear infinite;
          will-change: transform;
        }

        .reviews-scroll-content:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .review-card {
            width: 340px;
          }
        }
      `}</style>
    </section>
  );
}
