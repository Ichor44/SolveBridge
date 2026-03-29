import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PROBLEMS, PROPOSALS } from '@/lib/mock-data';
import { Briefcase, MessageSquare, ClipboardList, CheckCircle2, MoreVertical, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your challenges, review proposals, and track progress.</p>
          </div>
          <Button className="bg-primary text-background hover:bg-primary/90 font-bold h-12 px-6">
            <Plus className="w-5 h-5 mr-2" /> Post New Problem
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Challenges</p>
                  <p className="text-3xl font-headline font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Proposals</p>
                  <p className="text-3xl font-headline font-bold">9</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <ClipboardList className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-3xl font-headline font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-headline font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="problems" className="space-y-6">
          <TabsList className="bg-card p-1">
            <TabsTrigger value="problems" className="font-headline">My Challenges</TabsTrigger>
            <TabsTrigger value="tracking" className="font-headline">Project Tracking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="problems" className="space-y-6">
            <div className="grid gap-4">
              {PROBLEMS.map((problem) => (
                <Card key={problem.id} className="bg-card hover:border-primary/50 transition-colors">
                  <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-primary text-primary">{problem.category}</Badge>
                        <span className="text-xs text-muted-foreground">ID: {problem.id}</span>
                      </div>
                      <h3 className="text-xl font-headline font-bold">{problem.title}</h3>
                      <p className="text-sm text-muted-foreground">Posted on {problem.createdAt} • {problem.proposalsCount} proposals received</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" asChild>
                        <Link href={`/dashboard/proposals/${problem.id}`}>Review Proposals</Link>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
             <Card className="bg-card">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-headline font-bold">Smart Supply Chain Prediction Model</h3>
                      <p className="text-muted-foreground">Solver: <span className="text-primary font-medium">DeepLogic AI Team</span></p>
                    </div>
                    <Badge className="bg-primary text-background font-bold px-4 py-1">IN PROGRESS</Badge>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Milestone 2/4: Algorithm Validation</span>
                        <span className="text-primary font-bold">45%</span>
                      </div>
                      <Progress value={45} className="h-3 bg-muted" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-bold border-b pb-2">Recent Activities</h4>
                        <div className="space-y-3">
                          <div className="flex gap-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                            <div>
                              <p className="font-medium">Data preprocessing phase completed</p>
                              <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                          </div>
                          <div className="flex gap-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                            <div>
                              <p className="font-medium">Preliminary model architecture approved</p>
                              <p className="text-xs text-muted-foreground">1 week ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold border-b pb-2">Payment Schedule</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Deposit</span>
                            <span className="text-primary font-medium">$3,000 (Paid)</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Milestone 2</span>
                            <span className="font-medium">$4,500 (Pending)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
