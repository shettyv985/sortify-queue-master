
import React from 'react';
import { formatDistance } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface Activity {
  id: string;
  created_at: string;
  form: {
    title: string;
  };
  status?: string;
}

interface RecentActivityProps {
  activities: Activity[];
  loading?: boolean;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-muted-foreground">No recent activity found</p>
        <p className="text-sm text-muted-foreground">
          Activity will appear here when users submit forms
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
          <div className="flex-1">
            <p className="font-medium">
              New submission for form: <span className="text-primary">{activity.form.title}</span>
            </p>
            <div className="flex items-center mt-1 gap-2">
              <p className="text-sm text-muted-foreground">
                {formatDistance(new Date(activity.created_at), new Date(), { addSuffix: true })}
              </p>
              {activity.status && (
                <span 
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activity.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : activity.status === 'rejected' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {activity.status}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
