
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PlusCircle, 
  Clock, 
  FileText, 
  Download, 
  BarChart, 
  Users, 
  CheckCircle, 
  XCircle,
  LineChart,
  Calendar,
  MessageSquare,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { DashboardStatCard } from '@/components/dashboard/DashboardStatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

export default function CustomerDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  // Fetch dashboard statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      try {
        // Fetch the total number of forms created by the organization
        const { data: formsData, error: formsError } = await supabase
          .from('forms')
          .select('id', { count: 'exact' })
          .eq('created_by', profile?.id);
          
        if (formsError) throw formsError;
        
        // Fetch total submissions across all forms
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('submissions')
          .select('id', { count: 'exact' })
          .in('form_id', formsData?.map(form => form.id) || []);
          
        if (submissionsError) throw submissionsError;
        
        // Simple calculation for approval/rejection rates (placeholder data for now)
        // In a real app, you would have a status field to calculate these accurately
        const approvalRate = submissionsData?.length > 0 ? 75 : 0; // Placeholder value
        const rejectionRate = submissionsData?.length > 0 ? 25 : 0; // Placeholder value
        
        return {
          totalForms: formsData?.length || 0,
          totalSubmissions: submissionsData?.length || 0,
          approvalRate,
          rejectionRate
        };
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return {
          totalForms: 0,
          totalSubmissions: 0,
          approvalRate: 0,
          rejectionRate: 0
        };
      }
    },
    enabled: !!profile?.id,
  });

  // Fetch recent activity
  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select('*, form:form_id(title)')
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching recent activity:', error);
        return [];
      }
    },
    enabled: !!profile?.id,
  });

  const handleCreateForm = () => {
    navigate('/forms/create');
    toast.success('Form creation feature coming soon!');
  };

  const handleViewPending = () => {
    navigate('/submissions/pending');
    toast.success('Pending submissions feature coming soon!');
  };

  const handleDownloadReports = () => {
    toast.success('Reports download feature coming soon!');
  };

  const handleViewAnalytics = () => {
    navigate('/analytics');
    toast.success('Analytics feature coming soon!');
  };

  const handleViewSettings = () => {
    navigate('/settings');
    toast.success('Settings feature coming soon!');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Customer Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              {greeting}, {profile?.first_name || 'there'}! Here's your organization's overview.
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>Sign Out</Button>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardStatCard 
            title="Total Forms" 
            value={stats?.totalForms || 0} 
            icon={<FileText className="h-5 w-5 text-primary" />} 
            description="Forms created by your organization"
            loading={statsLoading}
          />
          
          <DashboardStatCard 
            title="Total Submissions" 
            value={stats?.totalSubmissions || 0} 
            icon={<Users className="h-5 w-5 text-indigo-500" />} 
            description="Form submissions received"
            loading={statsLoading}
          />
          
          <DashboardStatCard 
            title="Approval Rate" 
            value={`${stats?.approvalRate || 0}%`} 
            icon={<CheckCircle className="h-5 w-5 text-green-500" />} 
            description="Submissions approved"
            loading={statsLoading}
          />
          
          <DashboardStatCard 
            title="Rejection Rate" 
            value={`${stats?.rejectionRate || 0}%`} 
            icon={<XCircle className="h-5 w-5 text-red-500" />} 
            description="Submissions rejected"
            loading={statsLoading}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity Panel */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Recent Form Activity
                </CardTitle>
                <CardDescription>
                  Latest submissions and form interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity activities={recentActivity || []} loading={activityLoading} />
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Actions Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <QuickActions 
                  actions={[
                    {
                      icon: <PlusCircle className="h-5 w-5" />,
                      label: "Create New Form",
                      onClick: handleCreateForm
                    },
                    {
                      icon: <Clock className="h-5 w-5" />,
                      label: "View Pending Submissions",
                      onClick: handleViewPending
                    },
                    {
                      icon: <Download className="h-5 w-5" />,
                      label: "Download Reports",
                      onClick: handleDownloadReports
                    },
                    {
                      icon: <BarChart className="h-5 w-5" />,
                      label: "View Analytics",
                      onClick: handleViewAnalytics
                    },
                    {
                      icon: <Settings className="h-5 w-5" />,
                      label: "Settings",
                      onClick: handleViewSettings
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Analytics Preview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="mr-2 h-5 w-5 text-primary" />
                Form Submission Trends
              </CardTitle>
              <CardDescription>
                Submission activity over the past 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              {statsLoading ? (
                <Skeleton className="w-full h-full rounded-md" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <BarChart className="h-10 w-10 mx-auto mb-4 text-muted-foreground/60" />
                  <p>Analytics dashboard is coming soon!</p>
                  <p className="text-sm">Detailed charts and reports will be available here.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <CardDescription>
                Scheduled appointments and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              {statsLoading ? (
                <Skeleton className="w-full h-full rounded-md" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <Calendar className="h-10 w-10 mx-auto mb-4 text-muted-foreground/60" />
                  <p>Calendar integration is coming soon!</p>
                  <p className="text-sm">Track appointments and deadlines in real-time.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* User Engagement Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              User Engagement
            </CardTitle>
            <CardDescription>
              Recent communications and user interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-full h-16 rounded-md" />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-10 w-10 mx-auto mb-4 text-muted-foreground/60" />
                <p>User communications feature is coming soon!</p>
                <p className="text-sm">Track and respond to user feedback in one place.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
