
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Json } from '@/integrations/supabase/types';

const FormSubmission = () => {
  const { formId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);

  // Fetch form details
  const { data: formData, isLoading: formLoading, error: formError } = useQuery({
    queryKey: ['form', formId],
    queryFn: async () => {
      if (!formId) throw new Error('Form ID is required');
      
      const { data, error } = await supabase
        .from('forms')
        .select(`
          *,
          form_fields(*)
        `)
        .eq('id', formId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!formId && !!user,
  });

  // Generate dynamic form schema based on form fields
  const generateFormSchema = (fields) => {
    if (!fields || fields.length === 0) return z.object({});
    
    const schemaObj = {};
    
    fields.sort((a, b) => a.order_index - b.order_index).forEach(field => {
      let fieldSchema = z.string();
      
      if (field.required) {
        fieldSchema = fieldSchema.min(1, `${field.label} is required`);
      } else {
        fieldSchema = z.string().optional();
      }
      
      schemaObj[field.id] = fieldSchema;
    });
    
    return z.object(schemaObj);
  };
  
  // Create the dynamic form schema
  const formSchema = React.useMemo(() => {
    if (formData?.form_fields) {
      return generateFormSchema(formData.form_fields);
    }
    return z.object({});
  }, [formData]);

  // Create form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  // Form submission mutation
  const submitFormMutation = useMutation({
    mutationFn: async (formValues) => {
      if (!user || !formId) throw new Error('User ID and Form ID are required');
      
      // Create the form submission
      const { data, error } = await supabase
        .from('submissions')
        .insert({
          form_id: formId,
          user_id: user.id,
          data: formValues
        })
        .select('id')
        .single();
      
      if (error) throw error;
      
      // Add the user to the queue
      const { error: queueError } = await supabase
        .from('queue_entries')
        .insert({
          user_id: user.id,
          organization_id: formData.organization_id,
          submission_id: data.id,
          queue_number: `${Date.now()}`, // Simple queue number generation
          status: 'waiting',
          priority_score: 0, // Default priority
        });
      
      if (queueError) throw queueError;
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['queue'] });
      toast.success('Form submitted successfully! You have been added to the queue.');
      navigate('/dashboard/user/queue');
    },
    onError: (error) => {
      console.error('Form submission error:', error);
      toast.error('Failed to submit form. Please try again.');
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await submitFormMutation.mutateAsync(data);
    } finally {
      setSubmitting(false);
    }
  };

  if (formLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (formError || !formData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            We couldn't load this form. Please try again or contact support.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{formData.title}</CardTitle>
        <CardDescription>{formData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {formData.form_fields && formData.form_fields
              .sort((a, b) => a.order_index - b.order_index)
              .map((field) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={field.id}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label} {field.required && <span className="text-destructive">*</span>}</FormLabel>
                      <FormControl>
                        {field.type === 'text' && (
                          <Input {...formField} placeholder={`Enter ${field.label.toLowerCase()}`} />
                        )}
                        {field.type === 'textarea' && (
                          <Textarea {...formField} placeholder={`Enter ${field.label.toLowerCase()}`} />
                        )}
                        {field.type === 'select' && field.options && (
                          <Select 
                            onValueChange={formField.onChange} 
                            defaultValue={formField.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.isArray(field.options) && field.options.map((option, index) => {
                                const optionValue = typeof option === 'object' ? option.value || '' : option;
                                const optionLabel = typeof option === 'object' ? option.label || optionValue : option;
                                return (
                                  <SelectItem key={index} value={optionValue}>
                                    {optionLabel}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        )}
                      </FormControl>
                      {field.hasOwnProperty('description') && (
                        <FormDescription>{field.description}</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Form'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
        <Button variant="outline" onClick={() => navigate('/dashboard/user/forms')}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormSubmission;
