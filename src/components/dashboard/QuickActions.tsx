
import React from 'react';
import { Button } from '@/components/ui/button';

interface Action {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface QuickActionsProps {
  actions: Action[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="space-y-3">
      {actions.map((action, index) => (
        <Button 
          key={index}
          variant="outline" 
          className="w-full justify-start text-left"
          onClick={action.onClick}
          disabled={action.disabled}
        >
          <span className="mr-2">{action.icon}</span>
          {action.label}
        </Button>
      ))}
    </div>
  );
};
