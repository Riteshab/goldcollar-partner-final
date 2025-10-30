import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Briefcase, BarChart3, Users, Home, Building2, Crown, Phone, Mail, MessageCircle, CheckCircle, FileText, Shield, Wrench, X } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { SEO } from '../components/SEO';
import { useState } from 'react';

export function Services() {
  const { openContactForm } = useFormContext();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const seoComponent = (
    <SEO
      title="Services"
      description="Comprehensive commercial real estate services including property acquisition, leasing, asset management, and investment advisory. Expert guidance for all your property needs."
      keywords="commercial real estate services, property acquisition, commercial leasing, asset management, investment advisory, property consulting"
    />
  );
  const services = [
    {
      id: 1,
      icon: TrendingUp,
      title: "Portfolio Strategy Specialist",
      description: "We design bespoke investment roadmaps that build generational wealth and achieve your financial independence.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Defining clear long-term investment goals",
        "Structuring for optimal cash flow & capital growth",
        "Creating a 12-month actionable acquisition plan",
        "Aligning property selection with your unique risk profile"
      ],
      rationale: "Your property investment journey deserves more than generic advice. We work closely with you to understand your financial aspirations, risk tolerance, and lifestyle goals, then create a personalized roadmap specifically designed for your situation. This isn't about buying just any property—it's about building a strategic portfolio that generates both immediate cash flow and long-term capital growth. With our 12-month action plan, you'll know exactly what steps to take and when, removing the guesswork and helping you move forward with confidence. Whether you're aiming for financial freedom, early retirement, or generational wealth, we'll structure your portfolio to get you there efficiently and effectively.",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 2,
      icon: BarChart3,
      title: "Research & Due Diligence",
      description: "Our exhaustive due diligence moves beyond checklists to uncover a property's true potential and risks.",
      image: "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Application of our data-driven 25-point analysis matrix",
        "Forensic review of all contracts, building, and pest reports",
        "Identification of underlying structural and financial risks",
        "Uncovering latent value-add and development potential"
      ],
      rationale: "Most buyers rely on basic inspections and hope for the best. We go much deeper. Our comprehensive 25-point analysis examines every aspect of a property—from structural integrity and pest issues to hidden legal complications and council restrictions. But we don't stop at protecting you from problems. We actively search for hidden opportunities that others miss: renovation potential, subdivision possibilities, zoning advantages, and development prospects that can multiply your property's value. This forensic approach means you'll not only avoid costly mistakes but also uncover ways to manufacture equity and boost returns that typical buyers never discover. You'll make your investment decision with complete clarity and confidence.",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 3,
      icon: Briefcase,
      title: "Negotiation & Acquisition",
      description: "We act as your exclusive advocate, securing superior terms and prices through data-driven negotiation.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Leveraging market data to establish true property value",
        "Countering seller's agent tactics to prevent overpayment",
        "Negotiating favourable terms beyond just the price",
        "Securing exclusive access to off-market opportunities"
      ],
      rationale: "Buying a property is likely one of your biggest financial decisions, and seller's agents are trained to maximize the price you pay. We level the playing field. Armed with comprehensive market data and comparable sales analysis, we know exactly what a property is truly worth—and we negotiate from a position of strength on your behalf. We don't just focus on getting the lowest price; we negotiate better settlement terms, favorable conditions, flexible deposit structures, and advantageous clauses that protect your interests. Our relationships and market knowledge also give you exclusive access to off-market properties—premium opportunities that never hit the public market, where there's less competition and better value. You get the best possible deal on every front.",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 4,
      icon: Home,
      title: "Portfolio Optimisation",
      description: "We analyse your existing assets to unlock hidden equity and maximise long-term portfolio performance.",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Comprehensive review of your current property portfolio",
        "Identifying underperforming assets and growth opportunities",
        "Strategies for renovation, subdivision, or repositioning",
        "Actionable recommendations to enhance rental yield and equity"
      ],
      rationale: "Your existing properties may be sitting on untapped potential. We conduct a thorough review of your current portfolio to identify underperforming assets and hidden opportunities for growth. Perhaps one property has subdivision potential that could create two valuable lots. Maybe another would benefit from strategic renovations to boost rental income. Or there might be opportunities to reposition properties for higher returns. We provide you with clear, actionable recommendations—from cosmetic improvements that maximize rent to major value-add strategies like subdivision or development. This isn't about passively holding properties and hoping they grow; it's about actively manufacturing equity and optimizing every asset to work harder for your wealth-building goals.",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      icon: Users,
      title: "Access to Trusted Professionals",
      description: "Gain seamless access to our elite, pre-vetted network of over 40 industry-leading professionals.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Connections to expert mortgage brokers and financial planners",
        "Coordination with diligent solicitors and conveyancers",
        "Liaison with trusted builders, trades, and consultants",
        "Ensuring a high-quality, streamlined end-to-end process"
      ],
      rationale: "Property investment requires a team of trusted professionals—but finding and vetting them yourself is time-consuming and risky. We've already done the hard work for you. Our network of over 40 carefully vetted industry experts includes top mortgage brokers who secure the best finance rates, experienced solicitors who protect your legal interests, skilled builders and tradespeople who deliver quality work on time and budget, and strategic accountants who structure your investments tax-efficiently. These aren't random referrals; they're proven professionals we've worked with repeatedly and trust completely. This saves you countless hours of research, eliminates the risk of hiring the wrong people, and ensures every aspect of your property journey is handled by experts who understand your investment goals and work seamlessly together.",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      icon: FileText,
      title: "Market Research & Analysis",
      description: "We use sophisticated data intelligence to identify future growth hotspots before they enter the mainstream.",
      image: "https://images.pexels.com/photos/7651922/pexels-photo-7651922.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Macro-level analysis of economic and demographic trends",
        "Identification of emerging infrastructure and growth corridors",
        "Proprietary suburb-scorings based on key growth indicators",
        "Data-driven insights to inform strategic location selection"
      ],
      rationale: "Successful property investment isn't about chasing yesterday's hotspots—it's about identifying tomorrow's growth areas before everyone else does. We use sophisticated data analysis tools and market intelligence to track economic trends, infrastructure development, population shifts, and employment growth patterns. This allows us to pinpoint emerging suburbs and growth corridors before they hit mainstream attention, when prices are still attractive and potential is highest. We analyze everything from planned transport links and schools to demographic changes and rezoning opportunities. Instead of buying in areas that have already peaked, you'll invest in locations positioned for strong future growth, giving you a significant head start on capital appreciation and the best possible returns on your investment.",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 7,
      icon: Shield,
      title: "Risk Management & Mitigation",
      description: "Our 360-degree risk assessment process protects your capital and de-risks your investment decision.",
      image: "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Thorough analysis of market volatility and asset class risk",
        "On-the-ground assessment of property condition and defects",
        "Detailed review of planning overlays and council restrictions",
        "Converting identified risks into negotiation leverage"
      ],
      rationale: "Every property investment carries risks, but most buyers only see the obvious ones. We conduct a comprehensive 360-degree risk assessment that examines every potential issue: market volatility, physical property defects, council planning restrictions, environmental concerns, title problems, and zoning limitations. We inspect the property thoroughly, review planning overlays that might limit future development, and analyze market conditions that could affect your investment. But here's the key difference: we don't just identify risks to scare you off good opportunities. We assess how significant each risk truly is, develop strategies to mitigate them, and often convert identified issues into powerful negotiation leverage to reduce the purchase price. This means you'll invest with your eyes wide open, your capital protected, and often secure a better deal because we've helped you navigate around potential pitfalls that make other buyers walk away.",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 8,
      icon: Building2,
      title: "Property Development Project Management",
      description: "We manage your development from concept to completion, transforming your vision into profitable reality.",
      image: "https://images.pexels.com/photos/7641828/pexels-photo-7641828.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "End-to-end oversight from feasibility studies to site acquisition",
        "Coordination of planning, council approvals, and contractors",
        "Meticulous management of project budgets and timelines",
        "Maximising your project's potential to deliver a profitable outcome"
      ],
      rationale: "Property development can multiply your wealth exponentially—but it's also complex, time-consuming, and filled with potential pitfalls if not managed properly. Whether you're subdividing a block, adding a second dwelling, or undertaking a complete renovation, we manage every single aspect of your project from start to finish. We begin with thorough feasibility studies to ensure your project makes financial sense, then handle site acquisition, architect and designer coordination, council approvals and permits, contractor selection and management, budget oversight, and timeline coordination. You don't need to become a project manager or learn the development process. We handle all the complexity, stress, and coordination, ensuring your project stays on budget, on schedule, and delivers maximum profit. Your role is simple: approve key decisions and watch your equity grow as we transform your vision into a profitable reality.",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 9,
      icon: TrendingUp,
      title: "Tax & Financial Structuring",
      description: "We collaborate with your financial team to ensure your purchase is structured for optimal growth.",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: [
        "Guidance on the most effective ownership structures",
        "Strategies for tax efficiency and asset protection",
        "Expertise in complex purchasing entities like SMSF",
        "Liaison with your accountant and financial planner"
      ],
      rationale: "How you structure your property purchase can dramatically impact your wealth accumulation, tax efficiency, and asset protection. Should you buy in your personal name, through a trust, via a company, or using your Self-Managed Super Fund (SMSF)? Each option has different tax implications, asset protection benefits, and long-term wealth-building advantages. We work closely with your accountant and financial planner to ensure your purchase is structured optimally for your specific situation. We have extensive experience with complex structures including SMSF property purchases, family trusts, and company ownership arrangements. While we don't provide direct financial advice, we bridge the gap between property selection and financial strategy, ensuring all parties are aligned and your investment is set up for maximum tax efficiency, legal protection, and wealth creation from day one.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const divisions = [
    {
      icon: Home,
      title: "Buyers Agent",
      description: "Expert property acquisition, negotiation, and settlement services for residential and investment properties.",
      link: "/services#buyers-agent"
    },
    {
      icon: Building2,
      title: "Property Developer",
      description: "End-to-end development solutions from site acquisition to project delivery and sales.",
      link: "/services#property-developer"
    },
    {
      icon: Crown,
      title: "Luxury Club",
      description: "Exclusive membership providing priority access to premium off-market opportunities and investment insights.",
      link: "/services#luxury-club"
    }
  ];

  return (
    <main className="pt-20">
      {seoComponent}
      <section className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Comprehensive Property Services</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            From strategic advisory to hands-on management, we provide end-to-end solutions designed to maximize your investment returns and build lasting wealth through real estate.
          </p>
          <div className="flex justify-center px-4">
            <button
              onClick={openContactForm}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#8b7355] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-[#f5f1ed] transition text-base sm:text-lg group"
            >
              Start Your Property Journey
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our <span className="text-[#8b7355]">Divisions</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Comprehensive real estate solutions tailored to your investment goals and lifestyle aspirations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start mb-16">
          <div className="space-y-6">
            <div className="relative rounded-2xl p-6 shadow-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800)'
                }}
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-xl p-6">
                <div className="text-6xl font-bold text-[#8b7355]/10 mb-3">1</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Buyers <span className="text-[#8b7355]">Agent</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our commitment to your success starts with right strategy & Property purchase. We conduct data-driven market analysis to identify undervalued assets with hidden potential, provide comprehensive due diligence, and offer ongoing support throughout the settlement process. Unlike traditional buyers agents, we pinpoint properties that are primed for equity manufacturing via future development, ensuring your initial purchase is the foundation for accelerated wealth growth.
                </p>
              </div>
            </div>

            <div className="relative rounded-2xl p-6 shadow-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800)'
                }}
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-xl p-6">
                <div className="text-6xl font-bold text-[#8b7355]/10 mb-3">2</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Property <span className="text-[#8b7355]">Developer</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our expertise is rooted in over a decade of hands-on experience. We provide end-to-end consulting that transforms raw land or existing assets into cash flow-positive micro-developments. Our support covers feasibility studies, managing design, securing approvals, and overseeing construction. We act as your developer partner, guaranteeing your project successfully manufactures equity and generates maximum returns without consuming your time.
                </p>
              </div>
            </div>

            <div className="relative rounded-2xl p-6 shadow-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800)'
                }}
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-xl p-6">
                <div className="text-6xl font-bold text-[#8b7355]/10 mb-3">3</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Gold Collar <span className="text-[#8b7355]">Club</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The Gold Collar Club is an exclusive network designed for high-income professionals ready to ascend to the top investment tier. This private club offers access to off-market, development-ready opportunities and strategic insights not available to the general public. Membership provides bespoke portfolio strategy sessions, direct consulting access to Top Accountants, Lawyers & other profesionals, and the ultimate platform to accelerate wealth creation alongside a community of elite peers.
                </p>
              </div>
            </div>
          </div>

          <div className="sticky top-24 space-y-4">
            <div className="relative h-[180px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="City skyline"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[180px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Modern architecture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-[180px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Luxury property"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="relative h-[280px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxury interior design"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">Premium Service</h3>
                  <p className="text-white/90 text-sm">Delivering exceptional results across all property sectors</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#8b7355]">Services</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Swiss Knife for Your Property Goals - Nine comprehensive services working together to fast-track your success across every aspect of your property investment journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
                  <div className={`absolute top-4 left-4 bg-gradient-to-r ${service.color} rounded-lg p-3 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>

                  <div className="bg-[#f5f1ed] rounded-xl p-4 mb-6">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 text-[#8b7355] mr-2" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <span className="text-[#8b7355] mr-2 font-bold">•</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedService(service.id)}
                    className="inline-flex items-center text-[#8b7355] font-semibold hover:text-[#6d5a42] transition group"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need a Customized Solution?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Every property journey is unique. Let us create a tailored service package that perfectly aligns with your investment goals and financial objectives.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-[#8b7355] px-8 py-4 rounded-lg font-bold hover:bg-[#f5f1ed] transition text-lg group"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1ed] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Gold Collar Partners
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We combine decades of experience, proven results, and unwavering dedication to deliver exceptional outcomes for every client.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-[#8b7355] mb-4">100+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Properties Purchased</h3>
              <p className="text-gray-700 leading-relaxed">
                Across premium Australian locations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-[#8b7355] mb-4">$127K+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Average Returns</h3>
              <p className="text-gray-700 leading-relaxed">
                Across all properties.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-[#8b7355] mb-4">$500M+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Properties Transacted</h3>
              <p className="text-gray-700 leading-relaxed">
                Total portfolio value.
              </p>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-white/90 text-lg mb-6">
                Whether you're a first-time buyer, seasoned investor, or looking to optimize your property portfolio, our expert team is ready to help you achieve your investment goals.
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
              <Link
                to="/contact"
                className="inline-flex items-center bg-[#8b7355] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#6d5a42] transition group"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Our Services</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Strategy Sessions', desc: 'Personalized consultation and planning', icon: TrendingUp },
                    { title: 'Property Search', desc: 'Due diligence and property sourcing', icon: BarChart3 },
                    { title: 'Negotiation', desc: 'Expert deal-making and acquisition', icon: Briefcase },
                    { title: 'Portfolio Growth', desc: 'Ongoing optimization and expansion', icon: Home },
                    { title: 'Professional Network', desc: 'Trusted connections and referrals', icon: Users }
                  ].map((topic, idx) => {
                    const TopicIcon = topic.icon;
                    return (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition cursor-pointer">
                        <div className="bg-[#8b7355] rounded-full p-2 flex-shrink-0">
                          <TopicIcon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{topic.title}</h4>
                          <p className="text-sm text-white/70">{topic.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedService(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const service = services.find(s => s.id === selectedService);
              if (!service) return null;
              const Icon = service.icon;
              return (
                <>
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                    <div className="flex items-center space-x-3">
                      <div className={`bg-gradient-to-r ${service.color} rounded-lg p-2`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="text-gray-400 hover:text-gray-600 transition"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Overview</h4>
                      <p className="text-gray-700 leading-relaxed">{service.description}</p>
                    </div>

                    <div className="bg-[#f5f1ed] rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#8b7355] mr-2" />
                        Key Steps
                      </h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-gray-700">
                            <span className="text-[#8b7355] mr-3 font-bold text-lg">•</span>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Why This Matters</h4>
                      <p className="text-gray-700 leading-relaxed">{service.rationale}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          setSelectedService(null);
                          openContactForm();
                        }}
                        className="flex-1 bg-gradient-to-r from-[#8b7355] to-[#6d5a42] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition"
                      >
                        Get Started
                      </button>
                      <button
                        onClick={() => setSelectedService(null)}
                        className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
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
      )}
    </main>
  );
}
