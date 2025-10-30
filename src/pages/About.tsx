import { useFormContext } from '../context/FormContext';
import { SEO } from '../components/SEO';
import { Linkedin, Mail, Lightbulb, Target, Users, TrendingUp } from 'lucide-react';
import SunnyImage from '../assets/Sunny.jpg';
import AnishImage from '../assets/Anish.jpg';
import SamritaImage from '../assets/Samrita profile.jpg';

export function About() {
  const { openContactForm } = useFormContext();

  const teamMembers = [
    {
      name: "Sunny Katyal",
      credentials: "MPA, LLB",
      role: "Director & Principal Buyers Advocate",
      description: "As the visionary founder and backbone of Gold Collar Partners, Sunny Katyal stands as Australia's premier real estate strategist. With over a decade of unparalleled expertise as an investor, developer, and consultant, he's built an exceptional portfolio spanning townhouses, spec homes, and secondary dwellings. A former lawyer with a Master's in Public Administration, Sunny combines legal mastery, negotiation expertise, and forward-thinking innovation. His extraordinary ability to identify emerging market trends before they surface sets him apart. Through his proprietary 25-point evaluation matrix and data-driven approach, he delivers unmatched competitive advantages. Sunny doesn't just build properties—he builds legacies. His unwavering belief in democratizing wealth creation has helped countless families achieve financial freedom, transforming aspirations into multi-million dollar portfolios that consistently exceed expectations.",
      image: SunnyImage,
      email: "sunny@goldcollar.com.au",
      linkedin: "https://www.linkedin.com/in/sunnykatyal/"
    },
    {
      name: "Samrita Sharma",
      credentials: "CPA",
      role: "Chief Financial Officer",
      description: "Samrita, our esteemed CFO, brings a wealth of experience and a unique perspective to Gold Collar Partners. Born and raised in Singapore, Samrita developed a deep appreciation for real estate from an early age, recognizing its pivotal role in the city-state's economic success and urban development. With her strong financial acumen, Samrita serves as the backbone of Gold Collar Partners' financial operations. Her expertise extends beyond traditional accounting, as she provides invaluable insights on complex finance queries, helping to optimize our investment strategies and financial planning.",
      image: SamritaImage,
      email: "hello@goldcollarpartners.com",
      linkedin: "https://www.linkedin.com/company/gold-collar-partners/"
    },
    {
      name: "Anish Maidh",
      credentials: "",
      role: "Associate Buyers Agent",
      description: "As a trusted property strategist and long-time Melbourne resident, Anish brings over two decades of lived experience and market insight to every client relationship. With a deep-rooted passion for real estate and a proven track record as an investor, he has dedicated his career to helping everyday Australians make smarter property decisions and build lasting financial freedom. Anish's approach is grounded in authenticity, empathy, and results. He believes that exceptional buyer advocacy begins with genuine connection—listening deeply, understanding each client's unique goals, and delivering clear, honest advice at every stage of the journey. Whether guiding first-home buyers or seasoned investors, he empowers his clients with the knowledge, confidence, and strategy to succeed. Anish doesn't just transact properties—he transforms futures. Through his unwavering commitment to transparency and long-term value, he has helped countless individuals turn aspiration into action, and action into wealth.",
      image: AnishImage,
      email: "anish.maidh@goldcollar.com.au",
      linkedin: "https://www.linkedin.com/company/gold-collar-partners/"
    }
  ];

  const whyChooseUs = [
    {
      icon: Lightbulb,
      title: "Innovative Thinking",
      description: "We are at the forefront of property investment strategy, utilising innovative approaches to maximise your returns. From traditional buy-and-hold to advanced property development and off-market acquisitions, we cover the full spectrum of real estate investment.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: Target,
      title: "15+ Years of Experience",
      description: "With over 15 years of experience in the Australian property market, our team brings deep industry knowledge and proven results. We have built generational wealth for our clients and are committed to helping you do the same.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: Users,
      title: "Your A-Team in Real Estate",
      description: "Think of us as your elite property investment squad. Our diverse team includes experts in property acquisition, construction, finance, and negotiation, ensuring you have the best support to build and grow your wealth.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: TrendingUp,
      title: "Data Intelligence-Led Investing",
      description: "Every property is evaluated using our proprietary 25-point analysis matrix, examining market dynamics, capital growth potential, location metrics, and structural integrity. This data-driven approach empowers you to make confident, informed investment decisions, often unlocking up to 30% additional value.",
      image: "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      <SEO
        title="About Us"
        description="Learn about Gold Collar Partners' mission to simplify commercial real estate. Meet our expert team and discover our values-driven approach to property investment."
        keywords="about Gold Collar Partners, commercial real estate experts, property investment team, Melbourne property professionals"
      />

      <section className="bg-gradient-to-br from-[#8b7355] to-[#6d5a42] text-white py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">About Gold Collar Partners</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-base sm:text-lg text-white/95 leading-relaxed px-4">
                Australia's premier property investment partner, transforming wealth-building dreams into reality. We deliver comprehensive, end-to-end solutions combining market intelligence, proven negotiation expertise, and our proprietary 25-point evaluation matrix. From acquisition to development, we leverage decades of experience across property, finance, and law to build multi-million dollar portfolios for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-[#8b7355]">Leadership Team</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our experienced team combines decades of expertise in real estate, finance, and development to deliver exceptional results.
            </p>
          </div>

          <div className="space-y-16">
            {teamMembers.map((member, idx) => (
              <div key={idx} className={`grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex items-end">
                      <div className="p-8 text-white w-full">
                        <h3 className="text-3xl font-bold mb-2">{member.name}</h3>
                        {member.credentials && (
                          <p className="text-[#d4a855] font-semibold mb-1">{member.credentials}</p>
                        )}
                        <p className="text-white/90 text-lg">{member.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-10"
                      style={{
                        backgroundImage: `url(${member.image})`
                      }}
                    />
                    <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8">
                      <div className="mb-6">
                        <div className="inline-block bg-[#8b7355]/10 text-[#8b7355] px-4 py-2 rounded-lg font-semibold mb-4">
                          {member.role}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {member.name} {member.credentials && <span className="text-[#8b7355]">{member.credentials}</span>}
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {member.description}
                      </p>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-[#8b7355]">
                          <Mail className="h-5 w-5" />
                          <span className="font-medium">{member.email}</span>
                        </div>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#8b7355] hover:text-[#6d5a42] transition">
                          <Linkedin className="h-5 w-5" />
                          <span className="font-medium">LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1ed] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Why <span className="text-[#8b7355]">Choose Us?</span>
          </h2>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
            Our commitment to excellence, innovation, and client success sets us apart in the property investment landscape.
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative rounded-2xl overflow-hidden shadow-xl group min-h-[280px] sm:min-h-[320px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${item.image})`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b7355]/95 via-[#6d5a42]/90 to-[#8b7355]/95" />

                  <div className="relative z-10 p-6 sm:p-8 text-white h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 flex-shrink-0">
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-white/90 leading-relaxed text-base sm:text-lg flex-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied investors who have achieved their property goals with Gold Collar Partners.
            </p>
            <button onClick={openContactForm} className="bg-white text-[#8b7355] px-8 py-3 rounded-lg font-semibold hover:bg-[#f5f1ed] transition shadow-xl">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
