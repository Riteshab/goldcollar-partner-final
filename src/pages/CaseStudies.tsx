import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';

export function CaseStudies() {
  const { openContactForm } = useFormContext();
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('case_studies')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (data) {
      setCaseStudies(data);
      setLoading(false);
    }
  };

  return (
    <main className="pt-20">
      <SEO
        title="Success Stories & Case Studies"
        description="Real success stories from Gold Commercial clients. Discover how we've helped property buyers and investors achieve exceptional results across Australia."
        keywords="commercial real estate case studies, property investment success stories, Melbourne property deals, real estate testimonials"
      />
      <section className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Success Stories & Case Studies</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-4">
            Real stories from real clients. Discover how we've helped property buyers and investors achieve exceptional results across Australia.
          </p>
        </div>
      </section>

      <section className="bg-[#f5f1ed] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Detailed <span className="text-[#8b7355]">Case Studies</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Dive deep into the challenges, strategies, and outcomes of our most complex property acquisitions.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-4">Loading case studies...</p>
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No case studies available. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudies.map((study) => (
                  <div key={study.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
                    {study.image_url && (
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={study.image_url}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        {study.roi_percentage > 0 && (
                          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                            {study.roi_percentage}% ROI
                          </div>
                        )}
                        {study.featured && (
                          <div className="absolute top-4 left-4 bg-[#8b7355] text-white px-3 py-1 rounded-lg text-xs font-semibold">
                            Featured
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{study.title}</h3>
                      {study.client_name && (
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Client:</span> {study.client_name}
                        </p>
                      )}
                      {study.location && (
                        <div className="flex items-start text-gray-600 mb-3 text-sm">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                          <span>{study.location}</span>
                        </div>
                      )}

                      <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">{study.description}</p>

                      <div className="space-y-3">
                        <button
                          onClick={() => setExpandedStudy(expandedStudy === study.id ? null : study.id)}
                          className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
                        >
                          View Full Case Study
                          {expandedStudy === study.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>

                        <button
                          onClick={openContactForm}
                          className="w-full flex items-center justify-center gap-2 bg-[#8b7355] text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#6d5a42] transition"
                        >
                          Contact Us
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {expandedStudy && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm" onClick={() => setExpandedStudy(null)}>
                  <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                    <div
                      className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {(() => {
                        const study = caseStudies.find(s => s.id === expandedStudy);
                        if (!study) return null;

                        return (
                          <>
                            <div className="relative">
                              {study.image_url && (
                                <div className="relative h-80 overflow-hidden">
                                  <img
                                    src={study.image_url}
                                    alt={study.title}
                                    className="w-full h-full object-cover"
                                  />
                                  {study.roi_percentage > 0 && (
                                    <div className="absolute top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
                                      {study.roi_percentage}% ROI
                                    </div>
                                  )}
                                  {study.featured && (
                                    <div className="absolute top-6 left-6 bg-[#8b7355] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                                      Featured
                                    </div>
                                  )}
                                </div>
                              )}
                              <button
                                onClick={() => setExpandedStudy(null)}
                                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded-full hover:bg-white transition shadow-lg"
                              >
                                <X className="h-6 w-6" />
                              </button>
                            </div>

                            <div className="p-8 max-h-[60vh] overflow-y-auto">
                              <h2 className="text-3xl font-bold text-gray-900 mb-4">{study.title}</h2>

                              <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                                {study.client_name && (
                                  <div>
                                    <span className="font-semibold text-gray-700">Client:</span>
                                    <span className="text-gray-600 ml-2">{study.client_name}</span>
                                  </div>
                                )}
                                {study.location && (
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                                    <span className="text-gray-600">{study.location}</span>
                                  </div>
                                )}
                              </div>

                              {study.description && (
                                <div className="mb-6">
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">Overview</h3>
                                  <p className="text-gray-700 leading-relaxed">{study.description}</p>
                                </div>
                              )}

                              {study.challenge && (
                                <div className="mb-6">
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">Challenge</h3>
                                  <p className="text-gray-700 leading-relaxed">{study.challenge}</p>
                                </div>
                              )}

                              {study.solution && (
                                <div className="mb-6">
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">Solution</h3>
                                  <p className="text-gray-700 leading-relaxed">{study.solution}</p>
                                </div>
                              )}

                              {study.results && (
                                <div className="mb-6">
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">Results</h3>
                                  <p className="text-gray-700 leading-relaxed">{study.results}</p>
                                </div>
                              )}

                              <div className="flex gap-4 pt-6 border-t border-gray-200">
                                <button
                                  onClick={openContactForm}
                                  className="flex-1 flex items-center justify-center gap-2 bg-[#8b7355] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#6d5a42] transition"
                                >
                                  Contact Us
                                  <ArrowRight className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => setExpandedStudy(null)}
                                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let our experienced team guide you through your property journey. From complex negotiations to seamless settlements, we're here to help you achieve exceptional results.
          </p>
          <button
            onClick={openContactForm}
            className="inline-flex items-center bg-white text-[#8b7355] px-8 py-4 rounded-lg font-bold hover:bg-[#f5f1ed] transition text-lg group"
          >
            Book Your Free Consultation
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </main>
  );
}
