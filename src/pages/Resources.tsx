import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Calendar, ArrowRight, Mail } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';

export function Resources() {
  const { openNewsletterForm } = useFormContext();
  const [newsletterData, setNewsletterData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [resources, setResources] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
    fetchInsights();
  }, []);

  const fetchResources = async () => {
    const { data } = await supabase
      .from('resources')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (data) setResources(data);
  };

  const fetchInsights = async () => {
    const { data } = await supabase
      .from('insights')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(6);

    if (data) {
      setInsights(data);
      setLoading(false);
    }
  };


  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            name: newsletterData.name,
            email: newsletterData.email,
            status: 'active'
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          setSubmitMessage('This email is already subscribed to our newsletter.');
        } else {
          setSubmitMessage('Failed to subscribe. Please try again.');
        }
      } else {
        setSubmitMessage('Thank you for subscribing! You will receive our latest updates.');
        setNewsletterData({ name: '', email: '' });
      }
    } catch (err) {
      setSubmitMessage('An unexpected error occurred. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <main className="pt-20">
      <SEO
        title="Resources & Insights"
        description="Free commercial real estate guides, market reports, calculators, and expert insights. Download valuable resources to help with your property investment journey."
        keywords="property investment guides, real estate resources, market reports, investment calculators, property checklists, commercial real estate downloads"
      />
      <section className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Resources & Insights</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-4">
            Access our comprehensive library of property investment guides, market reports, and expert insights to help you make informed decisions.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Downloadable <span className="text-[#8b7355]">Resources</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Free guides, checklists, and tools to support your property investment journey.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">Loading resources...</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No resources available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition group">
                {resource.thumbnail_url && (
                  <a
                    href={resource.thumbnail_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg mb-4 cursor-pointer hover:opacity-90 transition"
                  >
                    <img
                      src={resource.thumbnail_url}
                      alt={resource.title}
                      className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </a>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-[#8b7355]/10 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-[#8b7355]" />
                  </div>
                  {resource.category && (
                    <span className="text-xs bg-[#f5f1ed] text-[#8b7355] px-3 py-1 rounded-full font-semibold">
                      {resource.category}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{resource.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500 font-medium">Resource</span>
                  <button
                    onClick={() => openNewsletterForm(resource.file_url)}
                    className="inline-flex items-center text-[#8b7355] font-semibold text-sm hover:text-[#6d5a42] transition group"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#f5f1ed] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest <span className="text-[#8b7355]">Blog & News</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Stay informed with our latest articles, market updates, and expert insights on property investment.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-4">Loading insights...</p>
            </div>
          ) : insights.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No blog posts available. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insights.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
                  {post.featured_image_url && (
                    <a
                      href={post.featured_image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-56 overflow-hidden block"
                    >
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </a>
                  )}

                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                      {post.published_at && (
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      )}
                      {post.author && <span>By {post.author}</span>}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>

                    <a
                      href="#"
                      className="inline-flex items-center text-[#8b7355] font-semibold text-sm hover:text-[#6d5a42] transition group"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center bg-[#8b7355] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition group"
            >
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center bg-white/20 rounded-full p-4 mb-6">
              <Mail className="h-8 w-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Get exclusive property insights, market updates, and investment tips delivered straight to your inbox every week.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newsletterData.name}
                  onChange={(e) => setNewsletterData({ ...newsletterData, name: e.target.value })}
                  className="w-full px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={newsletterData.email}
                  onChange={(e) => setNewsletterData({ ...newsletterData, email: e.target.value })}
                  className="w-full px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-[#8b7355] px-8 py-4 rounded-lg font-bold hover:bg-[#f5f1ed] transition disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
              </button>

              {submitMessage && (
                <p className="mt-4 text-white/90 text-sm">{submitMessage}</p>
              )}
            </form>

            <p className="text-xs text-white/70 mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Personalized Advice?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Our team of property experts is ready to help you navigate your investment journey with tailored strategies and insights.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-[#8b7355] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#6d5a42] transition text-lg group"
          >
            Schedule a Consultation
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
