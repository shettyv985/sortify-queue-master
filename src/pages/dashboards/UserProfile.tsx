
import React from 'react';
import { ProfileManagement } from '@/components/dashboard/ProfileManagement';

export default function UserProfile() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <p className="text-muted-foreground max-w-2xl">
        Manage your personal information and preferences. Your profile information helps us 
        provide you with a more personalized experience.
      </p>
      
      <ProfileManagement />
    </div>
  );
}
