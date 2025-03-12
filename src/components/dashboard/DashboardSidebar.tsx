
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Clock, 
  User, 
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  toggleSidebar 
}) => {
  const location = useLocation();
  
  const navItems = [
    { 
      path: '/dashboard/user', 
      label: 'Home', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      path: '/dashboard/user/forms', 
      label: 'Forms', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      path: '/dashboard/user/queue', 
      label: 'Queue Position', 
      icon: <Clock className="h-5 w-5" /> 
    },
    { 
      path: '/dashboard/user/profile', 
      label: 'Profile', 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      path: '/dashboard/user/help', 
      label: 'Help & Accessibility', 
      icon: <HelpCircle className="h-5 w-5" /> 
    },
  ];

  return (
    <div className={cn(
      "h-screen bg-white border-r border-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && <h2 className="text-xl font-bold">Queue App</h2>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  isCollapsed ? "justify-center" : "justify-start",
                  location.pathname === item.path 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
