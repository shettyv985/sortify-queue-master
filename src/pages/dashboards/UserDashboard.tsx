
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function UserDashboard() {
  const { profile, signOut } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <Button variant="outline" onClick={signOut}>Sign Out</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>My Queue Status</CardTitle>
              <CardDescription>Your current position in line</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-10">
              <p className="text-muted-foreground">You're not in any queue</p>
              <Button className="mt-4">Find Services</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>My Submissions</CardTitle>
              <CardDescription>Your form submissions</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-10">
              <p className="text-muted-foreground">No submissions yet</p>
              <Button className="mt-4">Fill a Form</Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Available Services</CardTitle>
            <CardDescription>Organizations you can register with</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-6 text-muted-foreground">No services available yet</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
