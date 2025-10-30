import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { SEO } from '../components/SEO';

export function FAQs() {
  const { openContactForm, openNewsletterForm } = useFormContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Buyers Advocacy Services",
      questions: [
        {
          q: "What does a buyer's advocate do?",
          a: "A buyer's advocate represents you — the buyer — through every stage of the property journey. From researching and inspecting properties to negotiating and securing the deal, we act solely in your best interest to achieve the best outcome possible."
        },
        {
          q: "Why should I use a buyer's advocate instead of buying on my own?",
          a: "We bring in-depth market insights, negotiation experience, and access to exclusive off-market listings. Our expertise helps you buy the right property faster, at the right price, and with less stress."
        },
        {
          q: "How much does it cost to hire a buyer's agent?",
          a: "Our pricing is transparent and tailored to your service level. Typically, we charge an initial engagement fee and a success fee only after your property purchase — with all costs clearly outlined before you commit."
        },
        {
          q: "How long does the buying process take?",
          a: "On average, clients secure their ideal property within 4–8 weeks, depending on the brief, budget, and market conditions. We work efficiently while keeping you informed every step of the way."
        },
        {
          q: "What's the difference between a buyer's agent and a real estate agent?",
          a: "A real estate agent represents the seller. A buyer's agent represents you. Our sole focus is finding and negotiating the best property for your needs and financial goals."
        }
      ]
    },
    {
      category: "Services & Process",
      questions: [
        {
          q: "How do you find off-market properties?",
          a: "Through our trusted network of selling agents, developers, and industry contacts, we gain early access to off-market and pre-market opportunities that aren't advertised publicly."
        },
        {
          q: "Do you assist interstate or overseas buyers?",
          a: "Yes. Many of our clients are based interstate or overseas. We manage the entire process remotely — from virtual inspections to negotiations and settlement — with clear communication throughout."
        },
        {
          q: "How do I get started with Gold Collar Partners?",
          a: "Simply book a complimentary consultation with our team. We'll discuss your goals, preferences, and budget before tailoring a detailed property strategy for you."
        }
      ]
    },
    {
      category: "Investment & Finance",
      questions: [
        {
          q: "Can you help first-time buyers?",
          a: "Absolutely. We love working with first-home buyers, guiding them through every step — from financial preparation to identifying and securing their ideal first property with confidence."
        },
        {
          q: "What hidden costs should I budget for when buying?",
          a: "Alongside the property price, buyers should budget for stamp duty, legal fees, building and pest inspections, loan establishment costs, and ongoing expenses such as strata or maintenance."
        }
      ]
    },
    {
      category: "Gold Collar Club",
      questions: [
        {
          q: "What is the Gold Collar Club membership?",
          a: "The Gold Collar Club is an exclusive network designed for high-income professionals ready to ascend to the top investment tier. This private club offers access to off-market, development-ready opportunities and strategic insights not available to the general public. Membership provides bespoke portfolio strategy sessions, direct consulting access to Top Accountants, Lawyers & other professionals, and the ultimate platform to accelerate wealth creation alongside a community of elite peers."
        },
        {
          q: "How do I join the Gold Collar Club?",
          a: "Gold Collar Club membership is by invitation or application. We look for committed high-income professionals with clear wealth-building goals and the capacity to act on premium development opportunities. Contact us to discuss eligibility and benefits."
        },
        {
          q: "What are the benefits of Gold Collar Club membership?",
          a: "Members receive first access to development-ready off-market properties, direct consulting access to top-tier accountants and lawyers, quarterly strategic portfolio reviews, invitations to exclusive property previews, priority service from our team, and networking opportunities with fellow high-net-worth investors."
        }
      ]
    },
    {
      category: "Legal & Settlement",
      questions: [
        {
          q: "Do I need a solicitor or conveyancer?",
          a: "Yes. A solicitor or conveyancer ensures your purchase is legally sound and manages the settlement process. We can connect you with trusted professionals we work closely with."
        },
        {
          q: "What happens after I've purchased the property?",
          a: "We support you through to settlement and beyond. Our team can introduce you to reliable property managers, mortgage brokers, and advisors to help you manage your new asset smoothly."
        }
      ]
    }
  ];

  const allQuestions = faqs.flatMap((category, catIndex) =>
    category.questions.map((q, qIndex) => ({
      ...q,
      category: category.category,
      index: catIndex * 100 + qIndex
    }))
  );

  const filteredQuestions = searchQuery.trim()
    ? allQuestions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allQuestions;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="pt-20">
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about commercial real estate investment, property management, leasing, and our services at Gold Commercial."
        keywords="commercial real estate FAQ, property investment questions, real estate answers, property buying questions"
      />
      <section className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Frequently Asked Questions</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Find answers to common questions about our services, process, and how we can help you achieve your property goals.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {searchQuery.trim() && (
              <p className="text-gray-600 mb-6">
                Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}

            <div className="space-y-3">
              {filteredQuestions.map((item) => (
                <div
                  key={item.index}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                >
                  <button
                    onClick={() => toggleAccordion(item.index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                  >
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-[#8b7355] mb-1">{item.category}</div>
                      <h3 className="text-lg font-bold text-gray-900">{item.q}</h3>
                    </div>
                    {openIndex === item.index ? (
                      <ChevronUp className="h-5 w-5 text-[#8b7355] flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  {openIndex === item.index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any FAQs matching your search. Try different keywords or contact us directly.
                </p>
                <button
                  onClick={openContactForm}
                  className="inline-flex items-center text-[#8b7355] font-semibold hover:text-[#6d5a42]"
                >
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Quick Contact</h3>
                  <p className="text-white/90 mb-6">
                    Can't find what you're looking for? Our team is ready to help.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 rounded-lg p-3">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-white/70">Call Us</p>
                        <p className="font-semibold">0424 238 507</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 rounded-lg p-3">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-white/70">Email Us</p>
                        <p className="font-semibold">hello@goldcollar.com.au</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={openContactForm}
                    className="block w-full text-center bg-white text-[#8b7355] px-6 py-3 rounded-lg font-bold hover:bg-[#f5f1ed] transition"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Market Insights</h3>
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img
                    src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Market insights"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Melbourne Property Market 2025</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest insights and trends shaping Melbourne's property landscape.
                </p>
                <button onClick={() => openNewsletterForm('https://example.com/melbourne-report-2025.pdf')} className="text-[#8b7355] font-semibold text-sm hover:text-[#6d5a42] inline-flex items-center">
                  Download Report <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Success Rate</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Properties Secured</span>
                      <span className="font-bold text-[#8b7355]">98%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-[#8b7355] h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Client Satisfaction</span>
                      <span className="font-bold text-[#8b7355]">100%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-[#8b7355] h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Average Savings</span>
                      <span className="font-bold text-[#8b7355]">$127K</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-[#8b7355] h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Join Luxury Club</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Exclusive access to premium properties and investment opportunities.
                  </p>
                  <button
                    onClick={openContactForm}
                    className="inline-flex items-center text-[#d4a855] font-semibold text-sm hover:text-[#e5b96b] group"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-white/90 text-lg mb-6">
                Our expert team is here to help. Whether you're a first-time buyer or seasoned investor, we're ready to answer your questions and guide you through your property journey.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-[#d4a855] mr-3 flex-shrink-0" />
                  <span>Speak directly with a property expert</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-[#d4a855] mr-3 flex-shrink-0" />
                  <span>Get detailed responses within 24 hours</span>
                </li>
                <li className="flex items-center">
                  <MessageCircle className="h-5 w-5 text-[#d4a855] mr-3 flex-shrink-0" />
                  <span>Book a free consultation to discuss your goals</span>
                </li>
              </ul>
              <button
                onClick={openContactForm}
                className="inline-flex items-center bg-[#8b7355] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#6d5a42] transition group"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Popular Topics</h3>
                <div className="space-y-4">
                  {[
                    { title: 'First-Time Buyers', desc: 'Everything you need to know to get started' },
                    { title: 'Investment Properties', desc: 'Maximizing returns and building wealth' },
                    { title: 'Off-Market Opportunities', desc: 'Access exclusive property listings' },
                    { title: 'Property Development', desc: 'From concept to completion guidance' }
                  ].map((topic, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition">
                      <div className="bg-[#8b7355] rounded-full p-2 flex-shrink-0">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{topic.title}</h4>
                        <p className="text-sm text-white/70">{topic.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
