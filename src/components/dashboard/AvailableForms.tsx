
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';

export const AvailableForms = () => {
  const { user } = useAuth();
  
  // Fetch forms from Supabase
  const { data: forms, isLoading, error } = useQuery({
    queryKey: ['available-forms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('is_published', true);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
  
  // Fetch user's submissions to check form status
  const { data: userSubmissions } = useQuery({
    queryKey: ['user-submissions'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('submissions')
        .select('*, form:form_id(title)')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
  
  const getFormStatus = (formId) => {
    if (!userSubmissions) return 'pending';
    
    const submission = userSubmissions.find(s => s.form_id === formId);
    if (!submission) return 'pending';
    
    // Check if the submission is in the queue
    return 'completed';
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };
  
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
          <CardTitle>Error Loading Forms</CardTitle>
          <CardDescription>
            We couldn't load the available forms. Please try again later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  if (!forms || forms.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Forms Available</CardTitle>
          <CardDescription>
            There are currently no forms available for submission.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {forms.map(form => {
        const status = getFormStatus(form.id);
        
        return (
          <Card key={form.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                {form.title}
              </CardTitle>
              <CardDescription>{form.description || 'No description available'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <div className="text-sm">
                  <span className="font-medium">Organization:</span> {form.organization_id}
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium mr-1">Status:</span> 
                  <div className="flex items-center gap-1">
                    {getStatusIcon(status)}
                    <span className="capitalize">{status}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t px-6 py-3">
              <Button 
                className="w-full" 
                variant={status === 'completed' ? "outline" : "default"}
                disabled={status === 'completed'}
                asChild={status !== 'completed'}
              >
                {status === 'completed' ? (
                  <span>Submitted</span>
                ) : (
                  <Link to={`/dashboard/user/forms/${form.id}`}>Fill Form</Link>
                )}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  );
};
