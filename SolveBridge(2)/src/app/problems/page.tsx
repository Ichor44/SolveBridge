import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PROBLEMS } from '@/lib/mock-data';
import { Search, Filter, Calendar, Briefcase, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProblemsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">Discover Challenges</h1>
            <p className="text-muted-foreground">Browse high-impact problems across engineering, research, and business.</p>
          </div>
          <div className="flex gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search problems..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <Button variant="secondary" className="rounded-full bg-primary text-background">All Categories</Button>
          <Button variant="outline" className="rounded-full">Engineering</Button>
          <Button variant="outline" className="rounded-full">Research</Button>
          <Button variant="outline" className="rounded-full">Business</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROBLEMS.map((problem) => (
            <Card key={problem.id} className="bg-card hover:border-primary transition-colors flex flex-col group">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <Badge className="bg-primary/20 text-primary border-primary/20">{problem.category}</Badge>
                  <span className="text-primary font-bold">{problem.budget}</span>
                </div>
                <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">
                  <Link href={`/problems/${problem.id}`}>{problem.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground line-clamp-3 mb-6 font-body">
                  {problem.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Due {problem.deadline}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {problem.proposalsCount} Proposals
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button asChild className="w-full bg-secondary hover:bg-primary hover:text-background font-semibold transition-all">
                  <Link href={`/problems/${problem.id}`} className="flex items-center justify-center gap-2">
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
