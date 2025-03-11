import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Button } from '@/components/ui/button';
import { Mic, Users, ClipboardList, Check, SlidersHorizontal } from 'lucide-react';

const Index: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <Layout>
      <Hero />
      
      <Features />
      
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 animate-on-scroll opacity-0">
              Tailored for Every <span className="text-primary">Role</span>
            </h2>
            <p className="text-lg text-foreground/80 animate-on-scroll opacity-0">
              Our platform provides specialized features for administrators, organizations, and end users.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-border animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-md hover:border-primary/20">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <ClipboardList size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Administrators</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Build custom registration forms</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Manage customer registrations</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Configure queue settings</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Learn More</Button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 border border-border animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-md hover:border-primary/20" style={{ animationDelay: '100ms' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <SlidersHorizontal size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Organizations</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Set custom sorting priorities</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Manage queue operations</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Access analytical insights</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Learn More</Button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 border border-border animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-md hover:border-primary/20" style={{ animationDelay: '200ms' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Users size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">End Users</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Complete registration forms</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Track real-time queue position</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm">Use speech-to-text accessibility</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
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
              <Button>Try It Now</Button>
            </div>
            
            <div className="relative animate-on-scroll opacity-0" style={{ animationDelay: '100ms' }}>
              <div className="relative bg-gray-50 rounded-2xl p-8 border border-border overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full animate-pulse-slow"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/30 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                <div className="relative flex items-center justify-center py-12">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-lg animate-float">
                    <Mic size={28} className="text-white" />
                  </div>
                </div>
                
                <div className="relative bg-white rounded-xl p-4 shadow-sm border border-border max-w-xs mx-auto">
                  <p className="text-sm font-medium mb-2">Speech Recognition</p>
                  <p className="text-sm text-foreground/80 mb-3">
                    "Schedule my appointment for tomorrow at 10 AM"
                  </p>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs flex items-center space-x-1"
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
      
      <section className="py-20 md:py-32 bg-primary clip-path-slant">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white animate-on-scroll opacity-0">
            Ready to Transform Your Queue Experience?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 animate-on-scroll opacity-0" style={{ animationDelay: '100ms' }}>
            Join organizations across industries that are streamlining operations and enhancing user experiences with our universal queue management system.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 animate-on-scroll opacity-0" style={{ animationDelay: '200ms' }}>
            Get Started Today
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
