
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';

export const QueueStatus: React.FC = () => {
  const { user } = useAuth();
  
  // Simplified version that fetches the basic queue data for the dashboard card
  const { data: queueData, isLoading } = useQuery({
    queryKey: ['queue-status'],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      // Get the user's queue entry
      const { data: userQueue, error: userQueueError } = await supabase
        .from('queue_entries')
        .select('*, submission:submission_id(form:form_id(title))')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (userQueueError) {
        if (userQueueError.code === 'PGRST116') {
          // No results found
          return null;
        }
        throw userQueueError;
      }
      
      if (!userQueue) return null;
      
      // Count how many people are ahead in the queue
      const { count, error: countError } = await supabase
        .from('queue_entries')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', userQueue.organization_id)
        .eq('status', 'waiting')
        .lt('created_at', userQueue.created_at); // People who joined before this user
      
      if (countError) throw countError;
      
      // Count total people in the queue
      const { count: totalCount, error: totalCountError } = await supabase
        .from('queue_entries')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', userQueue.organization_id)
        .eq('status', 'waiting');
      
      if (totalCountError) throw totalCountError;
      
      return {
        ...userQueue,
        position: count + 1, // Add 1 to include this user
        totalInQueue: totalCount,
        estimatedWaitTime: Math.max(5, count * 5) // Rough estimation: 5 min per person, minimum 5 mins
      };
    },
    enabled: !!user,
  });
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Queue Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!queueData) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Queue Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">You are not currently in any queue.</p>
            <Button asChild>
              <Link to="/dashboard/user/forms">Submit a Form</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const { position, totalInQueue, estimatedWaitTime } = queueData;
  const progress = Math.max(0, 100 - (position / totalInQueue) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Your Queue Status</CardTitle>
          <Badge variant={position <= 3 ? "destructive" : "default"}>
            {position <= 3 ? "Almost Your Turn" : "In Queue"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <div>Current Position</div>
              <div className="font-medium">Getting Closer</div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-3xl font-bold">#{position}</div>
              <div className="text-sm text-gray-500 mt-1">Your Position</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg flex items-center">
              <Clock className="text-gray-400 mr-3" />
              <div>
                <div className="text-xl font-medium">{estimatedWaitTime} min</div>
                <div className="text-sm text-gray-500">Estimated Wait</div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 flex items-center">
            <div className="flex-1">
              <div className="font-medium">Service: {queueData.submission?.form?.title || 'Document Verification'}</div>
              <div className="text-sm text-gray-500 mt-1">Department of Administration</div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/user/queue">
                <span>View Details</span>
                <ArrowRight className="ml-1 h-4 w-4 text-primary" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
