import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PROBLEMS } from '@/lib/mock-data';
import { Calendar, Briefcase, DollarSign, Clock, Send, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function ProblemDetailPage({ params }: { params: { id: string } }) {
  const problemId = (await params).id;
  const problem = PROBLEMS.find(p => p.id === problemId);

  if (!problem) return notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-sm py-1">{problem.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-headline font-bold leading-tight">{problem.title}</h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  {problem.posterName}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Posted {problem.createdAt}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h2 className="text-2xl font-headline font-bold">Challenge Overview</h2>
              <div className="prose prose-invert max-w-none font-body leading-relaxed text-muted-foreground whitespace-pre-line">
                {problem.description}
              </div>
            </div>

            <Card className="bg-card border-dashed">
              <CardHeader>
                <CardTitle className="font-headline">Submit a Solution Proposal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Estimated Timeline</Label>
                    <Input id="timeline" placeholder="e.g. 12 weeks" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualifications">Your Key Qualifications</Label>
                    <Input id="qualifications" placeholder="Relevant degrees or experience" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approach">Detailed Approach & Deliverables</Label>
                  <Textarea id="approach" placeholder="Describe your technical strategy, methodology, and what the poster can expect..." className="min-h-[200px]" />
                </div>
                <Button className="w-full bg-primary text-background hover:bg-primary/90 font-bold h-12">
                  <Send className="w-4 h-4 mr-2" /> Submit Proposal
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to SolveBridge Terms of Service for Intellectual Property.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card border-primary/30">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <DollarSign className="w-4 h-4 text-primary" /> Budget
                  </div>
                  <span className="text-xl font-bold font-headline">{problem.budget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4 text-primary" /> Deadline
                  </div>
                  <span className="font-semibold">{problem.deadline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Status
                  </div>
                  <Badge variant="outline" className="border-primary text-primary">{problem.status}</Badge>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-headline font-bold">About the Poster</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-primary">
                      {problem.posterName[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{problem.posterName}</p>
                      <p className="text-xs text-muted-foreground">Verified Organization</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
