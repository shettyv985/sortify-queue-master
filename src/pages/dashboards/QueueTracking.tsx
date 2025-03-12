
import React from 'react';
import { QueuePositionTracking } from '@/components/dashboard/QueuePositionTracking';

export default function QueueTracking() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Queue Position</h1>
      <p className="text-muted-foreground max-w-2xl">
        Track your position in the queue in real-time. You'll receive notifications when your 
        position changes significantly or when it's your turn.
      </p>
      
      <QueuePositionTracking />
    </div>
  );
}
