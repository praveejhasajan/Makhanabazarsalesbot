import { useEffect, useRef, useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  ChevronRight, 
  Download, 
  Globe, 
  Package, 
  Shield, 
  Truck,
  Mail,
  Phone,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

// AI Chatbot Component
interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Namaste! Welcome to Makhanabazar. I'm your Export Sales Manager. How can I help you today?",
      sender: 'bot',
      options: ['I want to import Makhana', 'Request Pricing', 'Product Information', 'Talk on WhatsApp']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [leadData, setLeadData] = useState({
    name: '',
    company: '',
    country: '',
    whatsapp: '',
    requirement: ''
  });
  const [currentStep, setCurrentStep] = useState<'initial' | 'name' | 'company' | 'country' | 'whatsapp' | 'requirement' | 'complete'>('initial');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'bot' | 'user', options?: string[]) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender, options }]);
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');
    
    setTimeout(() => {
      switch (option) {
        case 'I want to import Makhana':
          addMessage("Excellent! We export premium Makhana worldwide. To give you the best pricing, may I know your name?", 'bot');
          setCurrentStep('name');
          break;
        case 'Request Pricing':
          addMessage("Great! Price depends on quantity, packaging, and destination. Let me capture your details for a customized quote. What's your name?", 'bot');
          setCurrentStep('name');
          break;
        case 'Product Information':
          addMessage("We offer:\n• Plain Makhana (6-8mm, 8-10mm, 10mm+)\n• Flavored Makhana (Masala, Cheese, Caramel)\n• Makhana Powder\n• Private Label Services\n\nWhat would you like to know more about?", 'bot', ['Plain Makhana', 'Flavored Makhana', 'Private Label', 'MOQ & Pricing']);
          break;
        case 'Talk on WhatsApp':
          addMessage("Perfect! Click the button below to chat directly with our Export Manager on WhatsApp for instant pricing and samples.", 'bot', ['Open WhatsApp']);
          break;
        case 'Plain Makhana':
          addMessage("Our plain Makhana comes in 3 grades:\n• 6-8mm: Perfect for snacking\n• 8-10mm: Premium grade\n• 10mm+: Super premium\n\nAll hand-sorted and FSSAI certified. MOQ starts from 500kg. Interested?", 'bot', ['Yes, get quote', 'More info']);
          break;
        case 'Flavored Makhana':
          addMessage("Our flavored range includes:\n• Classic Masala\n• Cheese & Herbs\n• Caramel Crunch\n• Peri Peri\n\nCustom flavors available for bulk orders. MOQ: 1000kg for custom flavors.", 'bot', ['Get Quote', 'Request Samples']);
          break;
        case 'Private Label':
          addMessage("We offer complete private label solutions:\n• Custom packaging design\n• 1-4 color printing\n• Stand-up pouches / Vacuum packs\n• Your branding, our quality\n\nMOQ: 500kg. Ready to start your brand?", 'bot', ['Yes, discuss details', 'See packaging options']);
          break;
        case 'MOQ & Pricing':
          addMessage("Our MOQ:\n• Plain Makhana: 500kg\n• Flavored Makhana: 500kg\n• Private Label: 500kg\n• Custom flavors: 1000kg\n\nPricing depends on grade, quantity, and packaging. Let me get you a customized quote. What's your name?", 'bot');
          setCurrentStep('name');
          break;
        case 'Yes, get quote':
        case 'Get Quote':
        case 'Yes, discuss details':
          addMessage("Perfect! Let's get you a quote. What's your name?", 'bot');
          setCurrentStep('name');
          break;
        case 'Request Samples':
          addMessage("We provide samples for serious buyers. Sample cost is adjustable against your first order. What's your company name?", 'bot');
          setCurrentStep('company');
          break;
        case 'Open WhatsApp':
          window.open('https://wa.me/919999999999?text=Hi%20Makhanabazar,%20I%20am%20interested%20in%20importing%20Makhana.', '_blank');
          addMessage("WhatsApp opened! Our Export Manager will assist you shortly.", 'bot');
          break;
        default:
          addMessage("Thank you for your interest! To proceed, please share your contact details and I'll connect you with our Export Manager.", 'bot');
      }
    }, 500);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userInput = inputValue.trim();
    addMessage(userInput, 'user');
    setInputValue('');

    setTimeout(() => {
      switch (currentStep) {
        case 'name':
          setLeadData(prev => ({ ...prev, name: userInput }));
          addMessage(`Nice to meet you, ${userInput}! What's your company name?`, 'bot');
          setCurrentStep('company');
          break;
        case 'company':
          setLeadData(prev => ({ ...prev, company: userInput }));
          addMessage("Great! Which country are you importing to?", 'bot');
          setCurrentStep('country');
          break;
        case 'country':
          setLeadData(prev => ({ ...prev, country: userInput }));
          addMessage("Perfect! What's your WhatsApp number for quick communication?", 'bot');
          setCurrentStep('whatsapp');
          break;
        case 'whatsapp':
          setLeadData(prev => ({ ...prev, whatsapp: userInput }));
          addMessage("Almost done! What quantity are you looking for and any specific requirements? (Plain/Flavored, Packaging type)", 'bot');
          setCurrentStep('requirement');
          break;
        case 'requirement':
          setLeadData(prev => ({ ...prev, requirement: userInput }));
          addMessage(`Thank you! Here's what I have:\n\nName: ${leadData.name}\nCompany: ${leadData.company}\nCountry: ${leadData.country}\nWhatsApp: ${leadData.whatsapp}\nRequirement: ${userInput}\n\nOur Export Manager will contact you within 24 hours with pricing and details. You can also reach us directly:`, 'bot', ['WhatsApp Export Manager', 'Email Us']);
          setCurrentStep('complete');
          break;
        default:
          addMessage("Thank you for reaching out! For immediate assistance, please connect with our Export Manager on WhatsApp.", 'bot', ['WhatsApp Export Manager', 'Send Email']);
      }
    }, 500);
  };

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chatbot-window mb-4">
          {/* Header */}
          <div className="bg-[#D95A45] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Export Sales Manager</h3>
                <p className="text-xs text-white/80">Makhanabazar</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`max-w-[85%] ${msg.sender === 'bot' ? 'bg-white' : 'bg-[#D95A45] text-white'} rounded-2xl p-3 shadow-sm chat-message-enter`}>
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
                {msg.options && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="px-3 py-1.5 bg-[#F4EFE6] hover:bg-[#D95A45] hover:text-white text-[#2A2A2A] text-xs rounded-full transition-colors border border-[#E9E3DA]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#D95A45]"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-[#D95A45] text-white rounded-full flex items-center justify-center hover:bg-[#c44a35] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#D95A45] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#c44a35] transition-all hover:scale-110"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F4EFE6]/95 backdrop-blur-sm shadow-sm' : ''}`}>
      <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold text-[#2A2A2A]">Makhanabazar</a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-sm text-[#6E655D] hover:text-[#2A2A2A] transition-colors">Products</a>
          <a href="#origin" className="text-sm text-[#6E655D] hover:text-[#2A2A2A] transition-colors">Origin</a>
          <a href="#export" className="text-sm text-[#6E655D] hover:text-[#2A2A2A] transition-colors">Export</a>
          <a href="#contact" className="text-sm text-[#6E655D] hover:text-[#2A2A2A] transition-colors">Contact</a>
        </div>
        <a href="#contact" className="btn-accent text-sm">Export Inquiry</a>
      </div>
    </nav>
  );
};

// Section 1: Hero
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#F4EFE6] relative overflow-hidden flex items-center" style={{ zIndex: 10 }}>
      {/* Botanical decorations */}
      <svg className="absolute right-[10vw] top-[10vh] w-24 h-24 text-[#D95A45]/20 botanical-float" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 10 Q60 40 50 70 Q40 40 50 10 M50 70 L50 90" stroke="currentColor" strokeWidth="2" fill="none"/>
        <ellipse cx="50" cy="15" rx="8" ry="12" />
      </svg>
      <svg className="absolute left-[4vw] bottom-[10vh] w-20 h-20 text-[#D95A45]/15 botanical-float-reverse" viewBox="0 0 100 100" fill="currentColor">
        <path d="M30 80 Q40 50 30 20 Q50 40 70 20 Q60 50 70 80" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>

      <div className="w-full px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Left Column - Main Image */}
          <div className={`lg:col-span-7 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="card-rounded h-[60vh] lg:h-[72vh] overflow-hidden">
              <img src="/hero_makhana_bowl.jpg" alt="Premium Makhana" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Column - Text + Small Images */}
          <div className="lg:col-span-5 space-y-6">
            {/* Text Content */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="micro-label text-[#6E655D] mb-4">GRADE: 6-8MM / ORIGIN: INDIA</p>
              <h1 className="headline-display text-[clamp(44px,5vw,76px)] text-[#2A2A2A] mb-2">
                <span className="block text-[#D95A45]">PREMIUM</span>
                <span className="block">INDIAN</span>
                <span className="block">MAKHANA</span>
              </h1>
              <p className="text-[#6E655D] text-lg max-w-md mt-6 mb-8">
                Hand-sorted fox nuts sourced from Bihar. Ready for wholesale export with full documentation.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="btn-accent flex items-center gap-2">
                  Request Export Pricing <ChevronRight className="w-4 h-4" />
                </a>
                <button className="btn-outline flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download Specs
                </button>
              </div>
            </div>

            {/* Small Images */}
            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="card-rounded h-[25vh] overflow-hidden">
                <img src="/hero_makhana_pile.jpg" alt="Makhana Closeup" className="w-full h-full object-cover" />
              </div>
              <div className="card-rounded h-[25vh] overflow-hidden">
                <img src="/hero_farmer_hands.jpg" alt="Farmer Hands" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 2: Product Range
const ProductRangeSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="min-h-screen bg-[#F4EFE6] relative overflow-hidden flex items-center py-20" style={{ zIndex: 20 }}>
      <svg className="absolute right-[8vw] top-[8vh] w-20 h-20 text-[#D95A45]/20 botanical-float" viewBox="0 0 100 100" fill="currentColor">
        <path d="M20 50 Q40 30 60 50 Q40 70 20 50 M60 50 L80 50" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="50" cy="50" r="5" />
      </svg>

      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Left - Main Image */}
          <div className={`lg:col-span-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="card-rounded h-[50vh] lg:h-[72vh] overflow-hidden">
              <img src="/product_flavored_pile.jpg" alt="Flavored Makhana" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right - Text + Images */}
          <div className="lg:col-span-6 space-y-6">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="micro-label text-[#6E655D] mb-4">MOQ: 500 KG / PRIVATE LABEL AVAILABLE</p>
              <h2 className="headline-display text-[clamp(40px,4.5vw,68px)] text-[#2A2A2A] mb-2">
                <span className="block">PLAIN</span>
                <span className="block text-[#D95A45]">&</span>
                <span className="block">FLAVOURED</span>
              </h2>
              <p className="text-[#6E655D] text-lg max-w-md mt-6 mb-8">
                From classic raw makhana to masala, cheese, and caramel—produced in FSSAI-compliant facilities.
              </p>
              <a href="#packaging" className="btn-outline flex items-center gap-2 inline-flex">
                See Packaging Options <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/product_seeds_raw.jpg" alt="Raw Seeds" className="w-full h-full object-cover" />
              </div>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/product_packing_line.jpg" alt="Packing Line" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 3: Origin
const OriginSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="origin" ref={sectionRef} className="min-h-screen bg-[#F4EFE6] relative overflow-hidden flex items-center py-20" style={{ zIndex: 30 }}>
      <svg className="absolute left-[50%] top-[8vh] w-16 h-16 text-[#D95A45]/20 botanical-float-reverse" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 20 L50 80 M30 40 Q50 30 70 40" stroke="currentColor" strokeWidth="2" fill="none"/>
        <ellipse cx="50" cy="25" rx="6" ry="10" />
      </svg>

      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Left - Text + Images */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="micro-label text-[#6E655D] mb-4">CROP YEAR: 2025 / SIZES: 6-8MM, 8-10MM, 10MM+</p>
              <h2 className="headline-display text-[clamp(40px,4.5vw,68px)] text-[#2A2A2A] mb-2">
                <span className="block">HARVESTED</span>
                <span className="block">IN</span>
                <span className="block text-[#D95A45]">BIHAR</span>
              </h2>
              <p className="text-[#6E655D] text-lg max-w-md mt-6 mb-8">
                Grown in the Mithila region's ponds, sun-dried, and hand-graded for consistent size and crunch.
              </p>
              <button className="btn-outline flex items-center gap-2 inline-flex">
                Meet Our Farmers <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/origin_drying_baskets.jpg" alt="Drying Baskets" className="w-full h-full object-cover" />
              </div>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/origin_farmer_portrait.jpg" alt="Farmer Portrait" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right - Main Image */}
          <div className={`lg:col-span-6 order-1 lg:order-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="card-rounded h-[50vh] lg:h-[72vh] overflow-hidden">
              <img src="/origin_pond_harvest.jpg" alt="Pond Harvest" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 4: Nutrition
const NutritionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#F4EFE6] relative overflow-hidden flex items-center py-20" style={{ zIndex: 40 }}>
      <svg className="absolute right-[10vw] bottom-[15vh] w-20 h-20 text-[#D95A45]/20 botanical-float" viewBox="0 0 100 100" fill="currentColor">
        <path d="M20 80 Q35 50 20 20 M20 50 L50 50" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="55" cy="50" r="8" />
      </svg>

      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          <div className={`lg:col-span-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="card-rounded h-[50vh] lg:h-[72vh] overflow-hidden">
              <img src="/nutrition_bowl_yogurt.jpg" alt="Makhana Bowl" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="micro-label text-[#6E655D] mb-4">CERTS: FSSAI / ISO / APEDA (ON REQUEST)</p>
              <h2 className="headline-display text-[clamp(36px,4vw,64px)] text-[#2A2A2A] mb-2">
                <span className="block">HIGH PROTEIN</span>
                <span className="block text-[#D95A45]">LOW CALORIE</span>
                <span className="block">SNACK</span>
              </h2>
              <p className="text-[#6E655D] text-lg max-w-md mt-6 mb-8">
                Gluten-free, non-GMO, and rich in magnesium—ideal for health-conscious markets.
              </p>
              <button className="btn-outline flex items-center gap-2 inline-flex">
                Get Nutrition Sheet <Download className="w-4 h-4" />
              </button>
            </div>

            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/nutrition_closeup_crunch.jpg" alt="Crunch Closeup" className="w-full h-full object-cover" />
              </div>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/nutrition_pile_studio.jpg" alt="Studio Pile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 5: Export Ready
const ExportReadySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="export" ref={sectionRef} className="min-h-screen bg-[#F4EFE6] relative overflow-hidden flex items-center py-20" style={{ zIndex: 50 }}>
      <svg className="absolute left-[8vw] top-[10vh] w-16 h-16 text-[#D95A45]/20 botanical-float-reverse" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 10 L50 90 M30 30 L50 10 L70 30" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>

      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="micro-label text-[#6E655D] mb-4">INCO TERMS: FOB / CIF / DDP (DISCUSSED)</p>
              <h2 className="headline-display text-[clamp(36px,4vw,64px)] text-[#2A2A2A] mb-2">
                <span className="block">EXPORT</span>
                <span className="block text-[#D95A45]">READY</span>
                <span className="block">DOCUMENTATION</span>
              </h2>
              <p className="text-[#6E655D] text-lg max-w-md mt-6 mb-8">
                Phytosanitary certificates, COA, and custom packaging for EU, GCC, APAC, and North America.
              </p>
              <a href="#contact" className="btn-accent flex items-center gap-2 inline-flex">
                Start an Order <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/export_pallet_boxes.jpg" alt="Export Pallets" className="w-full h-full object-cover" />
              </div>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/export_documents.jpg" alt="Export Documents" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className={`lg:col-span-6 order-1 lg:order-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="card-rounded h-[50vh] lg:h-[72vh] overflow-hidden">
              <img src="/export_container_port.jpg" alt="Container Port" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 6: Packaging
const PackagingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="packaging" ref={sectionRef} className="min-h-screen bg-[#F4EFE6] relative overflow-hidden flex items-center py-20" style={{ zIndex: 60 }}>
      <svg className="absolute right-[15vw] top-[8vh] w-16 h-16 text-[#D95A45]/20 botanical-float" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 10 Q70 30 50 50 Q30 30 50 10 M50 50 L50 90" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>

      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          <div className={`lg:col-span-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="card-rounded h-[50vh] lg:h-[72vh] overflow-hidden">
              <img src="/packaging_pouches.jpg" alt="Packaging Pouches" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="micro-label text-[#6E655D] mb-4">PRINT: 1-4 COLOR / MOQ: 500 KG</p>
              <h2 className="headline-display text-[clamp(32px,3.8vw,60px)] text-[#2A2A2A] mb-2">
                <span className="block text-[#D95A45]">PRIVATE LABEL</span>
                <span className="block">&</span>
                <span className="block">BULK PACKING</span>
              </h2>
              <p className="text-[#6E655D] text-lg max-w-md mt-6 mb-8">
                Stand-up pouches, vacuum packs, and bulk cartons—printed with your brand, shipped under our compliance.
              </p>
              <a href="#contact" className="btn-outline flex items-center gap-2 inline-flex">
                Request Samples <Package className="w-4 h-4" />
              </a>
            </div>

            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/packaging_vacuum_bulk.jpg" alt="Vacuum Bulk" className="w-full h-full object-cover" />
              </div>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/packaging_label_print.jpg" alt="Label Print" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 7: Logistics
const LogisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#F4EFE6] relative overflow-hidden flex items-center py-20" style={{ zIndex: 70 }}>
      <svg className="absolute right-[10vw] top-[12vh] w-20 h-20 text-[#D95A45]/20 botanical-float-reverse" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10 50 Q30 30 50 50 Q70 70 90 50" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="50" cy="50" r="6" />
      </svg>

      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="micro-label text-[#6E655D] mb-4">LEAD TIME: 10-20 DAYS / PAYMENT: TT, LC</p>
              <h2 className="headline-display text-[clamp(36px,4vw,64px)] text-[#2A2A2A] mb-2">
                <span className="block">GLOBAL</span>
                <span className="block">SHIPPING</span>
                <span className="block text-[#D95A45]">ON TIME</span>
              </h2>
              <p className="text-[#6E655D] text-lg max-w-md mt-6 mb-8">
                Sea and air freight options, clear customs support, and dedicated export coordination from India to your port.
              </p>
              <a href="#contact" className="btn-outline flex items-center gap-2 inline-flex">
                Get Shipping Quote <Truck className="w-4 h-4" />
              </a>
            </div>

            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/logistics_truck_road.jpg" alt="Truck Road" className="w-full h-full object-cover" />
              </div>
              <div className="card-rounded h-[22vh] overflow-hidden">
                <img src="/logistics_port_crane.jpg" alt="Port Crane" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className={`lg:col-span-6 order-1 lg:order-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="card-rounded h-[50vh] lg:h-[72vh] overflow-hidden">
              <img src="/logistics_air_sea.jpg" alt="Air Sea Logistics" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 8: Contact Form
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    country: '',
    product: '',
    quantity: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen bg-[#F4EFE6] py-20 px-6 lg:px-12" style={{ zIndex: 80 }}>
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:sticky lg:top-32">
            <p className="micro-label text-[#6E655D] mb-4">EXPORT INQUIRY</p>
            <h2 className="headline-display text-[clamp(36px,4vw,64px)] text-[#2A2A2A] mb-2">
              <span className="block">REQUEST</span>
              <span className="block text-[#D95A45]">EXPORT</span>
              <span className="block">PRICING</span>
            </h2>
            <p className="text-[#6E655D] text-lg mt-6 mb-8 max-w-md">
              Tell us what you need. We'll reply within 24 hours with pricing, specs, and shipping options.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#D95A45]" />
                <span className="text-[#2A2A2A]">FSSAI-certified production</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#D95A45]" />
                <span className="text-[#2A2A2A]">Custom packaging & labeling</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#D95A45]" />
                <span className="text-[#2A2A2A]">Sea & air freight support</span>
              </div>
            </div>

            <div className="space-y-3">
              <a href="mailto:exports@makhanabazar.com" className="flex items-center gap-3 text-[#6E655D] hover:text-[#D95A45] transition-colors">
                <Mail className="w-5 h-5" />
                exports@makhanabazar.com
              </a>
              <a href="https://wa.me/919999999999" className="flex items-center gap-3 text-[#6E655D] hover:text-[#D95A45] transition-colors">
                <Phone className="w-5 h-5" />
                +91-99999-99999
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-[28px] p-8 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#6E655D] mb-2">Name *</label>
                    <input 
                      type="text" 
                      required
                      className="form-input"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#6E655D] mb-2">Company *</label>
                    <input 
                      type="text" 
                      required
                      className="form-input"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#6E655D] mb-2">Email *</label>
                    <input 
                      type="email" 
                      required
                      className="form-input"
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#6E655D] mb-2">Country *</label>
                    <input 
                      type="text" 
                      required
                      className="form-input"
                      placeholder="Importing country"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#6E655D] mb-2">Product Interest</label>
                    <select 
                      className="form-input"
                      value={formData.product}
                      onChange={(e) => setFormData({...formData, product: e.target.value})}
                    >
                      <option value="">Select product</option>
                      <option value="plain">Plain Makhana</option>
                      <option value="flavored">Flavored Makhana</option>
                      <option value="powder">Makhana Powder</option>
                      <option value="private">Private Label</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#6E655D] mb-2">Quantity (kg)</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="e.g., 1000 kg"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#6E655D] mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn-accent w-full flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Inquiry
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#D95A45]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-[#D95A45]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2A2A2A] mb-3">Thank You!</h3>
                <p className="text-[#6E655D]">We've received your inquiry. Our Export Manager will contact you within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 9: Footer
const Footer = () => {
  return (
    <footer className="bg-[#E9E3DA] py-16 px-6 lg:px-12" style={{ zIndex: 90 }}>
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="font-display text-2xl font-bold text-[#2A2A2A] mb-4">Makhanabazar</h3>
        <p className="text-[#6E655D] text-lg mb-8">Premium Makhana. Exported with Care.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          <a href="mailto:exports@makhanabazar.com" className="flex items-center gap-2 text-[#6E655D] hover:text-[#D95A45] transition-colors">
            <Mail className="w-4 h-4" /> exports@makhanabazar.com
          </a>
          <a href="https://wa.me/919999999999" className="flex items-center gap-2 text-[#6E655D] hover:text-[#D95A45] transition-colors">
            <Phone className="w-4 h-4" /> +91-99999-99999
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
          <Globe className="w-5 h-5 text-[#6E655D]" />
          <span className="text-sm text-[#6E655D]">Exporting to: UAE, USA, UK, Europe, Australia, Canada, Middle East</span>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <Shield className="w-5 h-5 text-[#D95A45]" />
          <span className="text-sm text-[#6E655D]">FSSAI Certified</span>
          <span className="text-[#6E655D]">|</span>
          <span className="text-sm text-[#6E655D]">ISO Certified</span>
          <span className="text-[#6E655D]">|</span>
          <span className="text-sm text-[#6E655D]">APEDA Registered</span>
        </div>

        <p className="text-sm text-[#6E655D]">© 2026 Makhanabazar. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main App
function App() {
  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection />
        <ProductRangeSection />
        <OriginSection />
        <NutritionSection />
        <ExportReadySection />
        <PackagingSection />
        <LogisticsSection />
        <ContactSection />
        <Footer />
      </main>
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}

export default App;
