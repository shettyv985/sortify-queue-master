
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const AvailableForms: React.FC = () => {
  // This would be fetched from a database in production
  const forms = [
    {
      id: 1,
      title: "Registration Application",
      description: "Complete your registration to access all services",
      deadline: "No deadline",
      status: "pending",
      organization: "Department of Administration"
    },
    {
      id: 2,
      title: "Service Request Form",
      description: "Request access to additional services",
      deadline: "Due in 5 days",
      status: "urgent",
      organization: "Public Services"
    },
    {
      id: 3,
      title: "Contact Information Update",
      description: "Keep your contact information up to date",
      deadline: "No deadline",
      status: "completed",
      organization: "Department of Records"
    }
  ];
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {forms.map(form => (
        <Card key={form.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              {form.title}
            </CardTitle>
            <CardDescription>{form.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <div className="text-sm">
                <span className="font-medium">Organization:</span> {form.organization}
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium mr-1">Status:</span> 
                <div className="flex items-center gap-1">
                  {getStatusIcon(form.status)}
                  <span className="capitalize">{form.status}</span>
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium">Deadline:</span> {form.deadline}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t px-6 py-3">
            <Button 
              className="w-full" 
              variant={form.status === 'completed' ? "outline" : "default"}
              disabled={form.status === 'completed'}
            >
              {form.status === 'completed' ? 'Submitted' : 'Fill Form'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
