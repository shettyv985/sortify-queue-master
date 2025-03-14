
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  Users, 
  ClipboardList, 
  Check, 
  SlidersHorizontal, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Intersection observer with better threshold values and smooth transitions
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.1, 0.2, 0.3], // Multiple thresholds for smoother transitions
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-delay') || '0');
          
          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            setTimeout(() => {
              entry.target.classList.add('animate-slide-up');
              entry.target.classList.remove('opacity-0');
            }, delay);
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el, index) => {
      if (!el.getAttribute('data-delay')) {
        // Staggered delay based on index
        el.setAttribute('data-delay', (index * 150).toString());
      }
      observer.observe(el);
    });

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleLearnMore = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  // Roles section data for mapping
  const roles = [
    {
      icon: <ClipboardList size={24} className="text-primary" />,
      title: "Administrators",
      features: [
        "Build custom registration forms",
        "Manage customer registrations",
        "Configure queue settings"
      ],
      delay: 0
    },
    {
      icon: <SlidersHorizontal size={24} className="text-primary" />,
      title: "Organizations",
      features: [
        "Set custom sorting priorities",
        "Manage queue operations",
        "Access analytical insights"
      ],
      delay: 150
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: "End Users",
      features: [
        "Complete registration forms",
        "Track real-time queue position",
        "Use speech-to-text accessibility"
      ],
      delay: 300
    }
  ];

  return (
    <Layout>
      <Hero />
      
      <div id="features">
        <Features />
      </div>
      
      <section id="roles" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4 animate-on-scroll opacity-0">
              Tailored for Everyone
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 animate-on-scroll opacity-0">
              Specialized for Every <span className="text-primary">Role</span>
            </h2>
            <p className="text-lg text-foreground/80 animate-on-scroll opacity-0">
              Our platform provides streamlined features for administrators, organizations, and end users.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-xl shadow-sm p-8 border border-border animate-on-scroll opacity-0 transition-all duration-500 hover:shadow-md hover:border-primary/20 hover:translate-y-[-5px]"
                data-delay={role.delay}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20">
                    {role.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4">{role.title}</h3>
                <ul className="space-y-3 mb-6">
                  {role.features.map((feature, featIndex) => (
                    <li key={featIndex} className="flex items-start">
                      <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  onClick={() => handleLearnMore('accessibility')}
                >
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="accessibility" className="py-20 md:py-32 bg-white overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full opacity-60 blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-40 blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
                <Sparkles size={14} className="mr-1" />
                Accessibility for Everyone
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Speech-to-Text <span className="text-primary">Integration</span>
              </h2>
              <p className="text-lg text-foreground/80 mb-6">
                Our platform features advanced speech recognition technology to help users with disabilities or language barriers complete forms and navigate the system with ease.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>One-click activation with floating button</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Automatic clipboard integration</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Multiple language support</span>
                </li>
              </ul>
              <Button 
                className="group relative overflow-hidden"
                onClick={handleGetStarted}
              >
                <span className="relative z-10">Try It Now</span>
                <ArrowRight className="relative z-10 ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 bg-primary/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </div>
            
            <div className="relative animate-on-scroll opacity-0" data-delay="200">
              <div className="relative bg-gray-50 rounded-2xl p-8 border border-border overflow-hidden shadow-sm transform hover:scale-105 transition-transform duration-500">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full" style={{ animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/30 rounded-full" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s" }}></div>
                <div className="relative flex items-center justify-center py-12">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-lg" style={{ animation: "bounce 2s ease infinite" }}>
                    <Mic size={28} className="text-white" />
                  </div>
                </div>
                
                <div className="relative bg-white rounded-xl p-4 shadow-sm border border-border max-w-xs mx-auto transform hover:shadow-md transition-all duration-300">
                  <p className="text-sm font-medium mb-2">Speech Recognition</p>
                  <p className="text-sm text-foreground/80 mb-3">
                    "Schedule my appointment for tomorrow at 10 AM"
                  </p>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs flex items-center space-x-1 group"
                    >
                      <Check size={12} />
                      <span>Copy</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 md:py-32 bg-primary clip-path-slant relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDJhOTggOTggMCAwMTk4IDk4IDk4IDk4IDAgMDEtOTggOTggOTggOTggMCAwMS05OC05OEE5OCA5OCAwIDAxMTAwIDJ6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')] bg-repeat opacity-20 -z-10"></div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white animate-on-scroll opacity-0">
            Ready to Transform Your Queue Experience?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 animate-on-scroll opacity-0" data-delay="100">
            Join organizations across industries that are streamlining operations and enhancing user experiences with our universal queue management system.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 animate-on-scroll opacity-0 group relative overflow-hidden"
            data-delay="200"
            onClick={handleGetStarted}
          >
            <span className="relative z-10">Get Started Today</span>
            <ArrowRight className="relative z-10 ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Button>
        </div>
      </section>
      
      <footer className="py-12 bg-secondary/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-semibold">Q</span>
              </div>
              <span className="font-medium">Sortify</span>
            </div>
            <div className="text-sm text-foreground/60">
              © {new Date().getFullYear()} Sortify Queue Master. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
