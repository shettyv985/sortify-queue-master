
import React from 'react';
import { Layout } from '@/components/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock, 
  UserCheck, 
  BarChart4, 
  ClipboardList,
  Plus,
  Settings,
  LayoutDashboard,
  LogOut
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen pt-20">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white border-r border-border p-4 md:min-h-[calc(100vh-5rem)] md:fixed">
            <div className="flex flex-col h-full">
              <div className="py-4">
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
                <p className="text-sm text-muted-foreground">Manage your queue system</p>
              </div>
              
              <nav className="space-y-1 flex-1">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#" className="flex items-center">
                    <LayoutDashboard size={18} className="mr-2" />
                    Dashboard
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#" className="flex items-center">
                    <Users size={18} className="mr-2" />
                    Queue Management
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#" className="flex items-center">
                    <ClipboardList size={18} className="mr-2" />
                    Form Builder
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#" className="flex items-center">
                    <BarChart4 size={18} className="mr-2" />
                    Analytics
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#" className="flex items-center">
                    <Settings size={18} className="mr-2" />
                    Settings
                  </a>
                </Button>
              </nav>
              
              <div className="pt-4 border-t border-border">
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight animate-fade-in">Dashboard Overview</h1>
              <p className="text-muted-foreground animate-fade-in">Welcome back, Admin!</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="animate-slide-up">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users size={18} className="text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,294</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last week</p>
                </CardContent>
              </Card>
              
              <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
                  <Clock size={18} className="text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24 min</div>
                  <p className="text-xs text-muted-foreground">-2.3% from last week</p>
                </CardContent>
              </Card>
              
              <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <UserCheck size={18} className="text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">+1.1% from last week</p>
                </CardContent>
              </Card>
              
              <Card className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Forms</CardTitle>
                  <ClipboardList size={18} className="text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 new this week</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                <CardHeader>
                  <CardTitle>Recent Queue Activity</CardTitle>
                  <CardDescription>Latest user interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium">John D. #{237 + i}</p>
                          <p className="text-sm text-muted-foreground">Registered via Form A</p>
                        </div>
                        <div className="text-sm text-right">
                          <p>12 min ago</p>
                          <p className="text-muted-foreground">Wait time: 24 min</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-slide-up" style={{ animationDelay: '500ms' }}>
                <CardHeader>
                  <CardTitle>Your Forms</CardTitle>
                  <CardDescription>Recently created forms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Customer Registration', 'Healthcare Intake', 'Appointment Booking'].map((form, i) => (
                      <div key={i} className="p-3 rounded-md border border-border bg-background">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{form}</h4>
                            <p className="text-sm text-muted-foreground">Created {i + 1} days ago</p>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <Plus size={16} className="mr-2" />
                      Create New Form
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
