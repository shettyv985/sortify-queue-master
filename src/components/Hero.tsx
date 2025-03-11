
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      // If user is logged in, redirect to their dashboard
      navigate('/dashboard');
    } else {
      // If user is not logged in, redirect to auth page
      navigate('/auth');
    }
  };

  const handleLearnMore = () => {
    // Scroll to features section or navigate to a different page
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-40 blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-100 rounded-full opacity-30 blur-3xl -z-10 animate-pulse-slow animation-delay-1000"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Chip */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 animate-fade-in">
            Universal Queue Management
          </div>
          
          {/* Hero heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            Queue Management 
            <span className="text-primary block mt-1">Reimagined for Everyone</span>
          </h1>
          
          {/* Hero description */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10 animate-slide-up animation-delay-200">
            A comprehensive queue solution that automates sorting, provides real-time updates, and ensures accessibility across all sectors. Designed with pixel-perfect precision.
          </p>
          
          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 animate-slide-up animation-delay-300">
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300"
              onClick={handleGetStarted}
            >
              {user ? 'Go to Dashboard' : 'Get Started'}
              <ChevronRight size={16} className="ml-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto px-8 py-6 border-primary/20 text-foreground hover:bg-primary/5 transition-all duration-300"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
