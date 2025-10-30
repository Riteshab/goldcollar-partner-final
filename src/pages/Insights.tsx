import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, X } from 'lucide-react';
import { SEO } from '../components/SEO';
import sunnyImage from '../assets/Gemini_Generated_Image_4rz8fz4rz8fz4rz8.png';
import industryToSmsfImage from '../assets/industry-super-to-SMSF-1-768x768.png';
import freeChecklistImage from '../assets/free-checklist-1024x1024.png';

interface Insight {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  author: string;
  published_at: string;
  status: string;
}

export default function Insights() {
  const location = useLocation();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  useEffect(() => {
    if (location.state?.scrollToSlug && insights.length > 0) {
      const insight = insights.find(i => i.slug === location.state.scrollToSlug);
      if (insight) {
        setSelectedInsight(insight);
      }
    }
  }, [location.state, insights]);

  const fetchInsights = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('insights')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching insights:', error);
      setInsights([]);
    } else {
      setInsights(data || []);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const defaultInsights: Insight[] = [
    {
      id: 'default-1',
      title: 'Residential Property Due Diligence Checklist – Free Download',
      slug: 'residential-property-due-diligence-checklist',
      excerpt: 'Buying or selling a home can be a complex process. We\'ve created a comprehensive free residential property checklist to help you stay organized and ensure you don\'t miss anything important.',
      content: `
        <h2>Residential Property Due Diligence Checklist – Free Download</h2>

        <h3>Buying or Selling a Home? Use This Free Checklist!</h3>

        <p>Buying or selling a home can be a complex process. We've created a comprehensive free residential property checklist to help you stay organized and ensure you don't miss anything important.</p>

        <p>This checklist covers everything from key property details like size and condition to important considerations like local area information and owner motivation.</p>

        <h3>Use this checklist to:</h3>

        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; line-height: 1.8;">
          <li><strong>Stay organized and on track:</strong> Keep all your information in one place.</li>
          <li><strong>Make informed decisions:</strong> Gather crucial data to help you make the best choices.</li>
          <li><strong>Negotiate effectively:</strong> Understand the property's strengths and weaknesses.</li>
        </ul>

        <div style="margin-top: 2rem; padding: 1.5rem; background: #f5f1ed; border-radius: 0.75rem; text-align: center;">
          <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTS1Tf99Ii3fq8lNAId1nP-vbt46pAS1x37MaWa48La41EM94kEPiLiKG1Vk9M7RjUbXP7hOs-BCpbC/pubhtml" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #8b7355; color: white; padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; font-size: 1.125rem;">Click Here to Access the Checklist</a>
        </div>
      `,
      featured_image_url: freeChecklistImage,
      author: 'Sunny Katyal',
      published_at: new Date(Date.now() - 86400000).toISOString(),
      status: 'published'
    },
    {
      id: 'default-2',
      title: 'Step-by-Step Guide: Transitioning from Industry Super to SMSF',
      slug: 'transitioning-from-industry-super-to-smsf',
      excerpt: 'Embarking on the journey from Industry Super to Self-managed Super Fund (SMSF) for property investment can be a rewarding endeavor. This guide walks you through the essential steps to make this transition smooth and successful.',
      content: `
        <h2>Step-by-Step Guide: Transitioning from Industry Super to SMSF</h2>

        <p>Embarking on the journey from Industry Super to Self-managed Super Fund (SMSF) for property investment can be a rewarding endeavor.</p>

        <p>This guide walks you through the essential steps to make this transition smooth and successful.</p>

        <h3>1. Initial Assessment and Planning</h3>
        <p>Start by evaluating your current financial situation. Review your industry super balance, income, and overall financial goals. It's crucial to seek professional advice. Consult with a financial advisor and SMSF specialist to determine if an SMSF suits your circumstances. Develop a robust investment strategy outlining your goals, risk tolerance, and desired asset allocation, including property investment.</p>

        <h3>2. SMSF Establishment</h3>
        <p>Choosing the SMSF structure is your next step. Decide between individual trustees or a corporate trustee structure. Determine who will be part of the SMSF, with up to six members allowed. Draft a comprehensive trust deed outlining the fund's rules and operations. All trustees must sign a declaration acknowledging their responsibilities. Register the SMSF with the Australian Business Register to obtain an ABN and TFN. Finally, set up a dedicated bank account for the SMSF.</p>

        <h3>3. Fund Transfer and Compliance</h3>
        <p>Notify your industry super fund about your intention to transfer funds to an SMSF. Complete the necessary paperwork to initiate the fund transfer. Formalize your investment strategy, including the plan to invest in property. Implement robust systems for maintaining SMSF documentation and financial records.</p>

        <h3>4. Property Investment Preparation</h3>
        <p>Research property markets to identify suitable locations and property types aligned with your investment strategy. Decide if you'll use a Limited Recourse Borrowing Arrangement (LRBA) for the property purchase and secure pre-approval from an SMSF-friendly lender. Hire a property lawyer experienced in SMSF property transactions.</p>

        <h3>5. Property Purchase Process</h3>
        <p>Choose a property that aligns with your SMSF investment strategy and complies with SMSF regulations. Conduct thorough inspections, valuations, and legal checks on the chosen property. Submit an offer on the property, subject to necessary conditions. Set up a bare trust if using borrowing arrangements. Have your SMSF lawyer review all contracts before signing and secure appropriate property insurance.</p>

        <h3>6. Settlement and Post-Purchase</h3>
        <p>Complete all loan documentation if using an LRBA and ensure all necessary funds are available for settlement. Ensure the property is correctly titled in the name of the SMSF trustees. Hire a property manager to handle tenancy matters.</p>

        <h3>7. Ongoing Compliance and Management</h3>
        <p>Conduct annual valuations of the property as required by SMSF regulations and ensure all property-related transactions comply with SMSF rules. Engage an approved SMSF auditor and complete annual reporting requirements. Regularly review and update your SMSF investment strategy.</p>

        <h3>8. Exit Strategy Planning</h3>
        <p>Develop a strategy for eventually selling the property or transitioning it out of the SMSF. Stay informed about property market trends to optimize your exit timing and plan for potential capital gains tax and other tax considerations upon property disposal.</p>

        <div style="margin-top: 2rem; padding: 1.5rem; background: #f5f1ed; border-radius: 0.75rem;">
          <h3 style="margin-bottom: 1rem;">Ready to take the next step in your property investment journey?</h3>
          <p style="margin-bottom: 1rem;">Don't miss this opportunity to get expert guidance tailored to your needs. Book your free 30-minute consultation with our experienced team now!</p>
          <p style="margin-bottom: 1rem;"><strong>Our property investment specialists are eager to help you:</strong></p>
          <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
            <li>Assess your current financial situation</li>
            <li>Explore SMSF property investment options</li>
            <li>Develop a personalized investment strategy</li>
            <li>Answer all your questions about SMSF and property investing</li>
          </ul>
          <a href="/contact" style="display: inline-block; background: #8b7355; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600;">Book Your Free Consultation</a>
        </div>
      `,
      featured_image_url: industryToSmsfImage,
      author: 'Sunny Katyal',
      published_at: new Date(Date.now() - 172800000).toISOString(),
      status: 'published'
    }
  ];

  const allInsights = insights.length > 0 ? insights : defaultInsights;

  return (
    <>
      <div className="min-h-screen bg-white">
        <SEO
          title="Property Investment Insights"
          description="Expert analysis and insights on SMSF property investment from Sunny Katyal. Stay informed with the latest strategies and guidance for building wealth through property."
          keywords="property investment insights, SMSF property investment, real estate analysis, property investment advice, industry super to SMSF"
        />

        <div className="relative bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              <div className="md:col-span-2">
                <div className="inline-block px-4 py-2 bg-[#8b7355]/10 rounded-full mb-6">
                  <span className="text-[#8b7355] font-semibold text-sm tracking-wide uppercase">Expert Analysis</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Investment <span className="text-[#8b7355]">Insights</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Discover expert strategies, market analysis, and actionable guidance for building wealth through property investment and SMSF.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#f5f1ed] to-white p-8 rounded-2xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#8b7355] flex-shrink-0">
                    <img
                      src={sunnyImage}
                      alt="Sunny Katyal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Sunny Katyal</h3>
                    <p className="text-sm text-[#8b7355] font-semibold mb-3">MPA, LLB</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Partner to Australia's Top 1% | Property Wealth Coach | Real Estate Strategist
                    </p>
                    <a
                      href="https://www.linkedin.com/in/sunnykatyal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#0077B5] hover:text-[#005582] transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 mt-4">Loading insights...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allInsights.map((insight, index) => (
                  <article
                    key={insight.id}
                    className={`group cursor-pointer ${index === 0 ? 'md:col-span-2 lg:col-span-3' : ''}`}
                    onClick={() => setSelectedInsight(insight)}
                  >
                    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full ${
                      index === 0 ? 'md:grid md:grid-cols-2' : ''
                    }`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={insight.featured_image_url}
                          alt={insight.title}
                          className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                            index === 0 ? 'h-full min-h-[400px]' : 'h-64'
                          }`}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className={`p-8 flex flex-col justify-between ${index === 0 ? 'md:p-12' : ''}`}>
                        <div>
                          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(insight.published_at)}</span>
                          </div>

                          <h2 className={`font-bold text-gray-900 mb-4 group-hover:text-[#8b7355] transition-colors leading-tight ${
                            index === 0 ? 'text-4xl md:text-5xl mb-6' : 'text-2xl'
                          }`}>
                            {insight.title}
                          </h2>

                          <p className={`text-gray-600 leading-relaxed ${
                            index === 0 ? 'text-lg mb-8 line-clamp-4' : 'text-base mb-6 line-clamp-3'
                          }`}>
                            {insight.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <span className="inline-flex items-center text-[#8b7355] font-semibold group-hover:gap-2 transition-all">
                            Read Article
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedInsight && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm" onClick={() => setSelectedInsight(null)}>
          <div className="min-h-screen px-4 py-8">
            <div
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedInsight.featured_image_url}
                  alt={selectedInsight.title}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                >
                  <X className="w-6 h-6 text-gray-900" />
                </button>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedInsight.published_at)}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {selectedInsight.title}
                </h1>

                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                    prose-ul:my-6 prose-ul:text-gray-600
                    prose-ol:my-6 prose-ol:text-gray-600
                    prose-li:mb-2
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-a:text-[#8b7355] prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: selectedInsight.content }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
