import { useState, useEffect, useRef } from 'react';
import { Play, BookOpen, FileText, Calculator, Calendar, ArrowRight, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import sunnyImage from '../assets/Gemini_Generated_Image_4rz8fz4rz8fz4rz8.png';

const HERO_VIDEO_URL = 'https://res.cloudinary.com/dd5fxatik/video/upload/v1760269429/herovideo_wj9uvn.mp4';
const WHY_WORK_VIDEO_URL = 'https://res.cloudinary.com/dfdkkqn7j/video/upload/v1761793318/WhatsApp_Video_2025-10-28_at_23.05.43_f6943186_x55atf.mp4';

interface ValueProp {
  title: string;
  description: string;
}

export function Home() {
  const { openContactForm, openNewsletterForm } = useFormContext();
  const [heroHeadline, setHeroHeadline] = useState('Transforming Dreams Into Reality');
  const [heroTagline, setHeroTagline] = useState('Invest in property like a pro');
  const [heroSubheadline, setHeroSubheadline] = useState('Gold Collar Partners delivers the complete process of investing in exclusive boutique-designed luxury properties across premium locations of Australia.');
  const [, setFeaturedCaseStudies] = useState<any[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<any[]>([]);
  const [videoError, setVideoError] = useState(false);
  const [valueProp1, setValueProp1] = useState<ValueProp>({ title: 'Buyers Advocacy', description: '' });
  const [valueProp2, setValueProp2] = useState<ValueProp>({ title: 'Property Development Consulting', description: '' });
  const [valueProp3, setValueProp3] = useState<ValueProp>({ title: 'Gold Collar Club', description: '' });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [whyWorkVideoUrl, setWhyWorkVideoUrl] = useState(WHY_WORK_VIDEO_URL);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetchSiteSettings();
    fetchValuePropositions();
    fetchFeaturedCaseStudies();
    fetchFeaturedBlogs();
    fetchWhyWorkVideo();
  }, []);

  const fetchSiteSettings = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['hero_headline', 'hero_tagline', 'hero_subheadline']);

    if (data) {
      data.forEach(setting => {
        if (setting.key === 'hero_headline') setHeroHeadline(setting.value);
        if (setting.key === 'hero_tagline') setHeroTagline(setting.value);
        if (setting.key === 'hero_subheadline') setHeroSubheadline(setting.value);
      });
    }
  };

  const fetchWhyWorkVideo = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'why_work_video_url')
      .maybeSingle();

    if (data?.value) {
      setWhyWorkVideoUrl(data.value);
    }
  };

  const fetchValuePropositions = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', [
        'value_prop_1_title',
        'value_prop_1_description',
        'value_prop_2_title',
        'value_prop_2_description',
        'value_prop_3_title',
        'value_prop_3_description'
      ]);

    if (data) {
      const settings = data.reduce((acc: any, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});

      setValueProp1({
        title: settings.value_prop_1_title || 'Buyers Advocacy',
        description: settings.value_prop_1_description || 'Our commitment to your success starts with right strategy & Property purchase. We conduct data-driven market analysis to identify undervalued assets with hidden potential, provide comprehensive due diligence, and offer ongoing support throughout the settlement process. Unlike traditional buyers agents, we pinpoint properties that are primed for equity manufacturing via future development, ensuring your initial purchase is the foundation for accelerated wealth growth.'
      });
      setValueProp2({
        title: settings.value_prop_2_title || 'Property Development Consulting',
        description: settings.value_prop_2_description || 'Our expertise is rooted in over a decade of hands-on experience. We provide end-to-end consulting that transforms raw land or existing assets into cash flow-positive micro-developments. Our support covers feasibility studies, managing design, securing approvals, and overseeing construction. We act as your developer partner, guaranteeing your project successfully manufactures equity and generates maximum returns without consuming your time.'
      });
      setValueProp3({
        title: settings.value_prop_3_title || 'Gold Collar Club',
        description: settings.value_prop_3_description || 'The Gold Collar Club is an exclusive network designed for high-income professionals ready to ascend to the top investment tier. This private club offers access to off-market, development-ready opportunities and strategic insights not available to the general public. Membership provides bespoke portfolio strategy sessions, direct consulting access to Top Accountants, Lawyers & other profesionals, and the ultimate platform to accelerate wealth creation alongside a community of elite peers.'
      });
    }
  };

  const fetchFeaturedCaseStudies = async () => {
    const { data } = await supabase
      .from('case_studies')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(3);

    if (data) setFeaturedCaseStudies(data);
  };

  const fetchFeaturedBlogs = async () => {
    const { data } = await supabase
      .from('insights')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(2);

    if (data) setFeaturedBlogs(data);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleVideoPlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  return (
    <>
      <SEO
        title="Home"
        description="Transforming Dreams Into Reality. Gold Collar Partners delivers the complete process of investing in exclusive boutique-designed luxury properties across premium locations of Australia."
        keywords="buyers agent Australia, property investment Melbourne, off-market properties, property portfolio growth, real estate strategy, property market insights, commercial real estate, residential property investment"
      />
      <section className="relative" style={{ marginTop: '-32px' }}>
        <div className="relative min-h-[450px] sm:min-h-[500px] md:h-[580px] overflow-hidden rounded-[24px] sm:rounded-[32px] max-w-[95%] lg:max-w-[90%] mx-auto shadow-2xl">
          {!videoError && (
            <div className="absolute inset-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                onError={() => {
                  console.error('Video failed to load');
                  setVideoError(true);
                }}
              >
                <source src={HERO_VIDEO_URL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div className="h-[60px] sm:h-[80px]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 sm:px-8 md:px-12 lg:px-16 h-full pb-8">
            <div className="max-w-2xl w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                {heroHeadline}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/90 mb-2 sm:mb-3 drop-shadow-xl font-semibold" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8)' }}>
                {heroTagline}
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 sm:mb-8 leading-relaxed max-w-xl lg:max-w-2xl drop-shadow-xl" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8)' }}>
                {heroSubheadline}
              </p>
              <button onClick={openContactForm} className="w-full sm:w-auto bg-white text-[#8b7355] px-6 sm:px-7 py-2.5 sm:py-3 rounded-md font-medium sm:font-semibold hover:bg-[#f5f1ed] transition shadow-lg text-sm sm:text-base">
                Start Your Investment Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-stone-50">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#8b7355]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8b7355]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Why Work With <span className="text-[#8b7355]">US</span>
            </h2>
            <div className="w-20 h-1 bg-[#8b7355] mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="hidden sm:block absolute -top-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 border-4 border-[#8b7355]/20 rounded-3xl"></div>
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-[#8b7355]/10 rounded-full"></div>

              <div
                className="relative bg-black/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl w-full aspect-[4/3] group cursor-pointer"
                onClick={handleVideoPlayPause}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  preload="metadata"
                  onEnded={() => setIsVideoPlaying(false)}
                >
                  <source src={whyWorkVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}></div>
                {!isVideoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full p-4 sm:p-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <Play className="h-8 w-8 sm:h-12 sm:w-12 text-[#8b7355]" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5 order-1 lg:order-2">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  <span className="hidden lg:block">Gold Collar Partners is the authority in accelerated property wealth for time-poor professionals. We draw upon decades of successfully guiding high-income individuals past the limitations of the slow 'buy-and-hold' mentality. Our holistic service provides a complete investment lifecycle—from identifying strategic acquisition targets to executing cash flow-positive development projects. This full-spectrum approach ensures your portfolio is resilient, high-yielding, and actively creating wealth, ultimately securing the financial freedom you demand. Work with us to move beyond complexity and access the investment strategy used by the true elite.</span>
                  <span className="lg:hidden">Your authority in accelerated property wealth. We guide high-income professionals through strategic acquisitions and cash flow-positive developments, ensuring resilient, high-yielding portfolios that create lasting financial freedom.</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b7355] to-[#6d5a42] rounded-xl transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#8b7355] to-[#6d5a42] rounded-xl py-3 sm:py-4 px-3 sm:px-5 shadow-xl flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white shrink-0">100+</div>
                    <div className="text-white/90 font-medium text-[10px] sm:text-xs uppercase tracking-wide leading-tight mt-1 sm:mt-0">Properties Purchased</div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c4a57b] to-[#8b7355] rounded-xl transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#c4a57b] to-[#8b7355] rounded-xl py-3 sm:py-4 px-3 sm:px-5 shadow-xl flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white shrink-0">$127K+</div>
                    <div className="text-white/90 font-medium text-[10px] sm:text-xs uppercase tracking-wide leading-tight mt-1 sm:mt-0">Average Return</div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6d5a42] to-[#4a3a2a] rounded-xl transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#6d5a42] to-[#4a3a2a] rounded-xl py-3 sm:py-4 px-3 sm:px-5 shadow-xl flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white shrink-0">$500M+</div>
                    <div className="text-white/90 font-medium text-[10px] sm:text-xs uppercase tracking-wide leading-tight mt-1 sm:mt-0">Properties Transacted</div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a0886f] to-[#6d5a42] rounded-xl transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#a0886f] to-[#6d5a42] rounded-xl py-3 sm:py-4 px-3 sm:px-5 shadow-xl flex flex-col sm:flex-row items-center sm:gap-4 text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white shrink-0">15+</div>
                    <div className="text-white/90 font-medium text-[10px] sm:text-xs uppercase tracking-wide leading-tight mt-1 sm:mt-0">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-6">
            Our <span className="text-[#8b7355]">Divisions</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto px-4">
            Tailored solutions for your investment goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <div className="space-y-4 sm:space-y-6">
            <div className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800)'
                }}
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="text-4xl sm:text-6xl font-bold text-[#8b7355]/10 mb-2 sm:mb-3">1</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {valueProp1.title.split(' ').map((word, i, arr) => (
                    i === arr.length - 1 ? <span key={i} className="text-[#8b7355]">{word}</span> : word + ' '
                  ))}
                </h3>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                  <span className="lg:hidden">Strategic property acquisition with data-driven market analysis. We identify undervalued assets primed for equity growth through future development.</span>
                  <span className="hidden lg:block">{valueProp1.description}</span>
                </p>
              </div>
            </div>

            <div className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800)'
                }}
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="text-4xl sm:text-6xl font-bold text-[#8b7355]/10 mb-2 sm:mb-3">2</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {valueProp2.title.split(' ').map((word, i, arr) => (
                    i === arr.length - 1 ? <span key={i} className="text-[#8b7355]">{word}</span> : word + ' '
                  ))}
                </h3>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                  <span className="lg:hidden">End-to-end consulting transforming assets into cash flow-positive developments. From feasibility to completion, we guarantee maximum returns.</span>
                  <span className="hidden lg:block">{valueProp2.description}</span>
                </p>
              </div>
            </div>

            <div className="relative rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800)'
                }}
              />
              <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="text-4xl sm:text-6xl font-bold text-[#8b7355]/10 mb-2 sm:mb-3">3</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {valueProp3.title.split(' ').map((word, i, arr) => (
                    i === arr.length - 1 ? <span key={i} className="text-[#8b7355]">{word}</span> : word + ' '
                  ))}
                </h3>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                  <span className="lg:hidden">Exclusive network for high-income professionals. Access off-market opportunities, strategic insights, and top-tier professional connections.</span>
                  <span className="hidden lg:block">{valueProp3.description}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:sticky lg:top-24 space-y-4">
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
      </section>

      <ReviewsCarousel />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-6">
            About Gold Collar Partners
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto px-4">
            Australia's premier real estate solution provider.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="relative bg-gradient-to-br from-[#8b7355] to-[#6d5a42] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px),
                                repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)`
            }}></div>
            <div className="relative z-10 text-[10px] sm:text-xs uppercase tracking-widest opacity-90 mb-4 sm:mb-6 font-semibold">
              Our Credibility
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-0 sm:flex sm:flex-col sm:space-y-4">
              <div className="sm:border-b sm:border-white/20 sm:pb-3">
                <div className="text-3xl sm:text-5xl font-bold mb-0.5 sm:mb-1">100+</div>
                <div className="text-xs sm:text-base font-medium opacity-95">Properties</div>
              </div>
              <div className="sm:border-b sm:border-white/20 sm:pb-3">
                <div className="text-3xl sm:text-4xl font-bold mb-0.5 sm:mb-1">$127K+</div>
                <div className="text-xs sm:text-base font-medium opacity-95">Avg Returns</div>
              </div>
              <div className="sm:border-b sm:border-white/20 sm:pb-3">
                <div className="text-3xl sm:text-4xl font-bold mb-0.5 sm:mb-1">$500M+</div>
                <div className="text-xs sm:text-base font-medium opacity-95">Transacted</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold mb-0.5 sm:mb-1">15+</div>
                <div className="text-xs sm:text-base font-medium opacity-95">Years</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">Our Mission</h2>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    <span className="sm:hidden">Creating exceptional property portfolios with transparency, expertise, and proven results.</span>
                    <span className="hidden sm:block">At Gold Collar Partners, we understand the challenges of creating exceptional property portfolios. We've designed our services around what investors truly need - transparency, expertise, and results.</span>
                  </p>
                </div>
                <div className="hidden sm:block">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">Our Approach</h2>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                    We combine deep market insights with personalized service, providing transparent guidance from initial consultation to final acquisition and beyond.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-[#8b7355] font-bold mr-2">1.</span>
                      <span className="text-gray-700 text-sm">Discovery & Strategy Session</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-[#8b7355] font-bold mr-2">2.</span>
                      <span className="text-gray-700 text-sm">Property Search & Due Diligence</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-[#8b7355] font-bold mr-2">3.</span>
                      <span className="text-gray-700 text-sm">Negotiations & Acquisition</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="relative h-48 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Professional team meeting"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#f5f1ed] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Why Choose Us?</h3>
                  <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <li className="flex items-start">
                      <span className="text-[#8b7355] mr-2 font-bold">✓</span>
                      <span>Maximise returns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#8b7355] mr-2 font-bold">✓</span>
                      <span>Expert A-team</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#8b7355] mr-2 font-bold">✓</span>
                      <span>Data-backed decisions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#8b7355] mr-2 font-bold">✓</span>
                      <span>Personalised strategies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="case-studies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Success <span className="text-[#8b7355]">Stories</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto px-4">
            Exceptional returns through strategic acquisitions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`https://images.pexels.com/photos/${i === 1 ? '323780' : i === 2 ? '1643383' : '1370704'}/pexels-photo-${i === 1 ? '323780' : i === 2 ? '1643383' : '1370704'}.jpeg?auto=compress&cs=tinysrgb&w=600`}
                  alt={`Project ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {i === 1 ? 'Melbourne CBD Development' : i === 2 ? 'Sydney Harbour Apartments' : 'Brisbane Luxury Residences'}
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  {i === 1 ? '28% ROI achieved through strategic positioning' : i === 2 ? 'Exclusive waterfront investment portfolio' : 'Premium development in prime location'}
                </p>
                <span className="text-[#8b7355] font-semibold text-sm">View Story →</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/case-studies"
            className="inline-flex items-center bg-[#8b7355] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition group"
          >
            View More Success Stories
            <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gradient-to-b from-white to-[#f8f6f3]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Latest <span className="text-[#8b7355]">Insights</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto px-4">
            Expert property market analysis
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {featuredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.published_at)}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#8b7355] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-sm">
                    {blog.excerpt}
                  </p>

                  <Link
                    to="/insights"
                    state={{ scrollToSlug: blog.slug }}
                    className="inline-flex items-center gap-2 text-[#8b7355] font-semibold hover:gap-4 transition-all text-sm"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-[#8b7355]/5 to-[#d4a855]/5 p-4 flex flex-col justify-between">
                  <div>
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#8b7355]/20">
                      <img
                        src={sunnyImage}
                        alt="Sunny Katyal"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 text-center mb-1">
                      Sunny Katyal
                    </h4>
                    <p className="text-xs text-[#8b7355] text-center font-medium mb-2">
                      MPA, LLB
                    </p>
                  </div>

                  {blog.featured_image_url && (
                    <div className="mt-3">
                      <img
                        src={blog.featured_image_url}
                        alt={blog.title}
                        className="w-full h-24 object-cover rounded-lg shadow-sm"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <a
                    href="https://www.linkedin.com/in/sunnykatyal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 text-[#0077B5] hover:text-[#005582] transition-colors mt-3"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/insights"
            className="inline-flex items-center bg-[#8b7355] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition group"
          >
            View All Blogs
            <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section id="faqs" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked <span className="text-[#8b7355]">Questions</span>
          </h2>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {[
            {
              q: 'How do you source off-market properties?',
              a: 'Through our network of agents, and industry contacts, we access exclusive opportunities before they reach the public market. Our long-term relationships ensure clients gain early access to high-value listings.'
            },
            {
              q: 'How do I get started with Gold Collar Partners?',
              a: 'Simply contact our team to discuss your goals. We\'ll outline our process, answer your questions, and begin the property search tailored to your requirements.'
            },
            {
              q: 'What is the Luxury Club membership?',
              a: 'Our invite only membership provides access to Syndiate deals & Under Market Off Market opportunities, deep Market insights, and tailored investment strategies designed for high-end buyers and investors.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-md">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/faqs"
            className="inline-flex items-center bg-[#8b7355] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition"
          >
            View More FAQs
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section id="resources" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Free <span className="text-[#8b7355]">Resources</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto px-4">
            Investment tools and guides.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group border border-gray-100 flex flex-col">
            <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Investment toolkit and documents"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8b7355]/80 to-transparent flex items-end">
                <div className="p-4 sm:p-6">
                  <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Investment Toolkit
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 flex-grow text-xs sm:text-sm lg:text-base">
                <span className="sm:hidden">Market analysis, due diligence checklist, and investment strategies.</span>
                <span className="hidden sm:block">Comprehensive toolkit including market analysis reports, due diligence checklist, and investment strategies to help you navigate the property market with confidence.</span>
              </p>
              <button onClick={() => openNewsletterForm('https://example.com/investment-toolkit.pdf')} className="bg-[#8b7355] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition w-full text-sm sm:text-base">
                Download Free
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group border border-gray-100 flex flex-col">
            <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Portfolio planning and strategy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8b7355]/80 to-transparent flex items-end">
                <div className="p-4 sm:p-6">
                  <FileText className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Portfolio Guide
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 flex-grow text-xs sm:text-sm lg:text-base">
                <span className="sm:hidden">Build diversified portfolios with case studies and proven strategies.</span>
                <span className="hidden sm:block">Learn how to build a diversified property portfolio that generates consistent returns. Includes case studies and proven strategies from successful investors.</span>
              </p>
              <button onClick={() => openNewsletterForm('https://example.com/investment-toolkit.pdf')} className="bg-[#8b7355] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition w-full text-sm sm:text-base">
                Download Free
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group border border-gray-100 flex flex-col">
            <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Financial calculator and analysis"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8b7355]/80 to-transparent flex items-end">
                <div className="p-4 sm:p-6">
                  <Calculator className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Yield Calculator
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 flex-grow text-xs sm:text-sm lg:text-base">
                <span className="sm:hidden">Assess investments with rental yield, growth projections, and ROI analysis.</span>
                <span className="hidden sm:block">Assess potential investments with our user-friendly calculator. Make data-driven decisions with our analytical tools. Includes rental yield, capital growth projections, and ROI analysis.</span>
              </p>
              <button className="bg-[#8b7355] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#6d5a42] transition w-full text-sm sm:text-base">
                Access Calculator
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
