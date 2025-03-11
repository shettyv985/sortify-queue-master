
import React from 'react';
import { Header } from './Header';
import { SpeechToText } from './SpeechToText';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  ListOrdered
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { profile } = useAuth();
  const location = useLocation();

  const renderSidebar = () => {
    if (!profile) return null;

    let navItems = [];

    if (profile.role === 'admin') {
      navItems = [
        { path: '/dashboard/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-2" /> },
        { path: '/organizations', label: 'Organizations', icon: <Building2 className="h-5 w-5 mr-2" /> },
        { path: '/forms', label: 'Forms', icon: <FileText className="h-5 w-5 mr-2" /> },
        { path: '/users', label: 'Users', icon: <Users className="h-5 w-5 mr-2" /> },
        { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5 mr-2" /> },
      ];
    } else if (profile.role === 'customer') {
      navItems = [
        { path: '/dashboard/customer', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-2" /> },
        { path: '/queue', label: 'Queue', icon: <ListOrdered className="h-5 w-5 mr-2" /> },
        { path: '/forms', label: 'Forms', icon: <FileText className="h-5 w-5 mr-2" /> },
        { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5 mr-2" /> },
      ];
    } else {
      navItems = [
        { path: '/dashboard/user', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-2" /> },
        { path: '/services', label: 'Services', icon: <Building2 className="h-5 w-5 mr-2" /> },
        { path: '/queue-status', label: 'Queue Status', icon: <ListOrdered className="h-5 w-5 mr-2" /> },
        { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5 mr-2" /> },
      ];
    }

    return (
      <aside className="hidden md:flex flex-col w-64 border-r bg-white">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Queue System</h2>
          <p className="text-sm text-muted-foreground">Logged in as {profile.role}</p>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                    location.pathname === item.path ? 'bg-gray-100 font-medium' : ''
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      <div className="flex flex-1">
        {renderSidebar()}
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
      <SpeechToText />
    </div>
  );
};
