
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: Array<'admin' | 'customer' | 'user'>;
};

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      console.log('No user found, redirecting to login');
    }
  }, [isLoading, user]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If roles are specified, check if the user has the required role
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // Redirect to the appropriate dashboard based on role
    let redirectPath = '/dashboard/user';
    
    if (profile.role === 'admin') {
      redirectPath = '/dashboard/admin';
    } else if (profile.role === 'customer') {
      redirectPath = '/dashboard/customer';
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
