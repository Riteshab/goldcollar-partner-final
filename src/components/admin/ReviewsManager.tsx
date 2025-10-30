import { useState, useEffect } from 'react';
import { Star, Check, X, Trash2, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Review {
  id: string;
  customer_name: string;
  address: string;
  property_type: string;
  review_text: string;
  rating: number;
  status: string;
  created_at: string;
  approved_at: string | null;
}

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ status: 'approved', approved_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchReviews();
      setSelectedReview(null);
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Failed to approve review');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;
      fetchReviews();
      setSelectedReview(null);
    } catch (error) {
      console.error('Error rejecting review:', error);
      alert('Failed to reject review');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this review?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchReviews();
      setSelectedReview(null);
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
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

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reviews Management</h2>
          <p className="text-gray-600 text-sm mt-1">Review and approve customer testimonials</p>
        </div>

        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === status
                  ? 'bg-[#8b7355] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600">No {filter !== 'all' ? filter : ''} reviews found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{review.customer_name}</h3>
                    {getStatusBadge(review.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{review.address}</p>
                  <span className="inline-block px-2 py-1 bg-[#8b7355]/10 text-[#8b7355] text-xs font-semibold rounded">
                    {review.property_type}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {renderStars(review.rating)}
                  <p className="text-xs text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{review.review_text}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedReview(review)}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>

                {review.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(review.id)}
                      className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}

                {review.status === 'approved' && (
                  <button
                    onClick={() => handleReject(review.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                  >
                    <X className="w-4 h-4" />
                    Unapprove
                  </button>
                )}

                {review.status === 'rejected' && (
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                )}

                <button
                  onClick={() => handleDelete(review.id)}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedReview && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedReview.customer_name}</h3>
                {getStatusBadge(selectedReview.status)}
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-semibold text-gray-700">Address</label>
                <p className="text-gray-900">{selectedReview.address}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Property Type</label>
                <p className="text-gray-900">{selectedReview.property_type}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Rating</label>
                <div className="mt-1">{renderStars(selectedReview.rating)}</div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Review</label>
                <p className="text-gray-900 leading-relaxed mt-1">{selectedReview.review_text}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Submitted</label>
                <p className="text-gray-600 text-sm">
                  {new Date(selectedReview.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {selectedReview.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleApprove(selectedReview.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    <Check className="w-5 h-5" />
                    Approve Review
                  </button>
                  <button
                    onClick={() => handleReject(selectedReview.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    <X className="w-5 h-5" />
                    Reject Review
                  </button>
                </>
              )}

              {selectedReview.status === 'approved' && (
                <button
                  onClick={() => handleReject(selectedReview.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  <X className="w-5 h-5" />
                  Unapprove Review
                </button>
              )}

              {selectedReview.status === 'rejected' && (
                <button
                  onClick={() => handleApprove(selectedReview.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  <Check className="w-5 h-5" />
                  Approve Review
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
