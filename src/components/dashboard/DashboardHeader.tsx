import React, { useState } from 'react';
import { Bell, LogOut, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

export const DashboardHeader: React.FC = () => {
  const { profile, signOut } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your queue position is now #3", time: "5 min ago", read: false },
    { id: 2, message: "New form available for submission", time: "1 hour ago", read: false },
    { id: 3, message: "Your turn is approaching, please be ready", time: "2 hours ago", read: true },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleNotificationRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const userName = profile?.first_name || 'User';
  const userInitial = (profile?.first_name || 'U')[0].toUpperCase();

  return (
    <header className="h-16 border-b bg-white px-4 flex items-center justify-between">
      <div className="text-lg font-medium">
        Welcome, {userName}
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleNotificationRead}
                  className="text-xs h-7"
                >
                  Mark all as read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <DropdownMenuItem key={notification.id} className="p-3 cursor-default">
                  <div className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                    <div>{notification.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-3 text-sm text-center text-gray-500">
                No notifications
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/dashboard/user/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
