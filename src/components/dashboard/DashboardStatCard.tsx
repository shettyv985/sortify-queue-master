
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  loading?: boolean;
}

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  title,
  value,
  icon,
  description,
  loading = false
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
            {loading ? (
              <Skeleton className="h-9 w-24" />
            ) : (
              <span className="text-3xl font-bold">{value}</span>
            )}
          </div>
          {icon && <div className="rounded-full bg-primary/10 p-2">{icon}</div>}
        </div>
        {description && <p className="mt-2 text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
};
