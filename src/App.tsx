
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import CustomerDashboard from "./pages/dashboards/CustomerDashboard";
import UserDashboard from "./pages/dashboards/UserDashboard";
import UserProfile from "./pages/dashboards/UserProfile";
import FormsList from "./pages/dashboards/FormsList";
import FormDetails from "./pages/dashboards/FormDetails";
import QueueTracking from "./pages/dashboards/QueueTracking";
import HelpAccessibility from "./pages/dashboards/HelpAccessibility";
import NotFound from "./pages/NotFound";
import React, { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { SpeechToText } from "./components/SpeechToText";

const queryClient = new QueryClient();

const AppRoutes = () => {
  // Listen for route changes to apply animations
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Admin Routes */}
      <Route 
        path="/dashboard/admin" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Customer Routes */}
      <Route 
        path="/dashboard/customer" 
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* User Routes with Dashboard Layout */}
      <Route 
        path="/dashboard/user" 
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="forms" element={<FormsList />} />
        <Route path="forms/:formId" element={<FormDetails />} />
        <Route path="queue" element={<QueueTracking />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="help" element={<HelpAccessibility />} />
      </Route>
      
      {/* Dashboard redirect based on role */}
      <Route 
        path="/dashboard" 
        element={<Navigate to="/dashboard/user" replace />} 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
            <SpeechToText />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
