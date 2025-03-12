
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Loader2, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const QueuePositionTracking = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  
  // Fetch user's queue position
  const { 
    data: queueData, 
    isLoading, 
    error,
    refetch
  } = useQuery({
    queryKey: ['queue-position'],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      // Get the user's queue entry
      const { data: userQueue, error: userQueueError } = await supabase
        .from('queue_entries')
        .select(`
          *,
          submission:submission_id(
            form:form_id(title)
          ),
          organization:organization_id(name)
        `)
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
  
  const manualRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
      toast.success('Queue position updated');
    } catch (err) {
      toast.error('Failed to update queue position');
    } finally {
      setRefreshing(false);
    }
  };
  
  // Setup real-time subscription to queue changes
  useEffect(() => {
    if (!user || !queueData) return;
    
    const channel = supabase
      .channel('queue-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'queue_entries',
          filter: `organization_id=eq.${queueData.organization_id}`
        },
        () => {
          // Refetch queue data when there are changes
          queryClient.invalidateQueries({ queryKey: ['queue-position'] });
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queueData, queryClient]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Queue</CardTitle>
          <CardDescription>
            We couldn't load your queue position. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={manualRefresh} disabled={refreshing}>
            {refreshing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  if (!queueData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Not In Queue</CardTitle>
          <CardDescription>
            You are not currently in any queue. Submit a form to enter a queue.
          </CardDescription>
        </CardHeader>
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
          <div className="flex gap-2 items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={manualRefresh}
              disabled={refreshing}
              className="h-8 w-8"
            >
              <RefreshCcw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Badge variant={position <= 3 ? "destructive" : "default"}>
              {position <= 3 ? "Almost Your Turn" : "In Queue"}
            </Badge>
          </div>
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
              <div className="font-medium">Service: {queueData.submission?.form?.title || 'Document Processing'}</div>
              <div className="text-sm text-gray-500 mt-1">{queueData.organization?.name || 'Department of Administration'}</div>
            </div>
            <ArrowRight className="text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
