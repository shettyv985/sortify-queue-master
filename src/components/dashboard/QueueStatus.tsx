
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from 'lucide-react';

export const QueueStatus: React.FC = () => {
  // This would come from a real-time database in production
  const queuePosition = 5;
  const totalInQueue = 15;
  const estimatedWaitTime = 25; // minutes
  
  const progress = Math.max(0, 100 - (queuePosition / totalInQueue) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Your Queue Status</CardTitle>
          <Badge variant={queuePosition <= 3 ? "destructive" : "default"}>
            {queuePosition <= 3 ? "Almost Your Turn" : "In Queue"}
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
              <div className="text-3xl font-bold">#{queuePosition}</div>
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
              <div className="font-medium">Service: Document Verification</div>
              <div className="text-sm text-gray-500 mt-1">Department of Administration</div>
            </div>
            <ArrowRight className="text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
