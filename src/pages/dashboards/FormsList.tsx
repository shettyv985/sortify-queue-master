
import React from 'react';
import { AvailableForms } from '@/components/dashboard/AvailableForms';

export default function FormsList() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Available Forms</h1>
      <p className="text-muted-foreground max-w-2xl">
        View and complete the forms available to you. Once submitted, your form will be processed
        and you will be placed in the appropriate queue.
      </p>
      
      <AvailableForms />
    </div>
  );
}
