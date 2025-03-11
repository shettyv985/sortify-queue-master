
import React from 'react';
import { Users, ClipboardCheck, SlidersHorizontal, BarChart4 } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Users size={24} className="text-primary" />,
      title: "Intelligent Queue Management",
      description: "Automated sorting and prioritization that adapts to your organization's unique needs."
    },
    {
      icon: <ClipboardCheck size={24} className="text-primary" />,
      title: "Drag-and-Drop Form Builder",
      description: "Create customized registration forms with our intuitive interface, no coding required."
    },
    {
      icon: <SlidersHorizontal size={24} className="text-primary" />,
      title: "Customizable Rules Engine",
      description: "Configure tailored sorting rules based on age, gender, status, or any custom criteria."
    },
    {
      icon: <BarChart4 size={24} className="text-primary" />,
      title: "Real-Time Analytics",
      description: "Gain valuable insights into queue performance, wait times, and user demographics."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 animate-slide-up">
            Designed for <span className="text-primary">Every Industry</span>
          </h2>
          <p className="text-lg text-foreground/80 animate-slide-up animation-delay-200">
            From healthcare and finance to government services and retail, our system adapts to your specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-4 left-6 h-8 w-8 rounded-lg bg-background flex items-center justify-center shadow-sm border border-border">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
