
import React from 'react';
import { useParams } from 'react-router-dom';
import FormSubmission from '@/components/dashboard/FormSubmission';

export default function FormDetails() {
  const { formId } = useParams();
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Submit Form</h1>
      <p className="text-muted-foreground max-w-2xl">
        Please fill out all required fields in the form below. Once submitted, you will be placed
        in the queue and can track your position in real-time.
      </p>
      
      <FormSubmission />
    </div>
  );
}
