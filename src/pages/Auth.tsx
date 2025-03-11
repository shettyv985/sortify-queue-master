
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const loginTabRef = useRef<HTMLButtonElement>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirectPath = location.state?.from?.pathname || getDashboardByRole();
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, location, profile]);

  const getDashboardByRole = () => {
    if (!profile) return '/dashboard/user';
    
    switch (profile.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'customer':
        return '/dashboard/customer';
      default:
        return '/dashboard/user';
    }
  };

  const handleSignupSuccess = () => {
    // Switch to login tab after successful signup
    if (loginTabRef.current) {
      loginTabRef.current.click();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <Tabs defaultValue="login">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Queue Management System</CardTitle>
            <CardDescription className="text-center">
              Log in or create an account to get started
            </CardDescription>
            <TabsList className="grid w-full grid-cols-2 mt-4">
              <TabsTrigger ref={loginTabRef} value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm onSuccess={handleSignupSuccess} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
