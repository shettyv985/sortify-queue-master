
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function CustomerDashboard() {
  const { profile, signOut } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <Button variant="outline" onClick={signOut}>Sign Out</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Queue</CardTitle>
              <CardDescription>Current queue status</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
              <p className="text-muted-foreground">People waiting</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Forms</CardTitle>
              <CardDescription>Your forms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
              <p className="text-muted-foreground">Total forms</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Submissions</CardTitle>
              <CardDescription>Form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
              <p className="text-muted-foreground">Total submissions</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Queue</CardTitle>
              <CardDescription>People currently in line</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-muted-foreground">No one in queue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Priority Rules</CardTitle>
              <CardDescription>Queue sorting rules</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-muted-foreground">No priority rules yet</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
