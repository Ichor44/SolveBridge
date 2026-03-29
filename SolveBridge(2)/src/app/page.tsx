import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Target, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072" 
            fill 
            className="object-cover" 
            alt="Tech Background"
            data-ai-hint="technology digital"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 border-primary text-primary px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
            NEW: AI PROPOSAL SUMMARIZER
          </Badge>
          <h1 className="text-6xl md:text-8xl font-headline font-extrabold mb-8 leading-tight tracking-tighter">
            BRIDGING PROBLEMS <br />WITH <span className="text-primary italic">INNOVATION</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-body">
            The elite marketplace for engineering challenges, breakthrough research, and complex business problems. Find world-class solvers or share your toughest challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-background hover:bg-primary/90 font-bold px-8 h-14 text-lg">
              <Link href="/problems" className="flex items-center gap-2">
                Browse Problems <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-muted font-bold px-8 h-14 text-lg">
              Post a Challenge
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border bg-card hover:border-primary transition-all group">
              <div className="bg-muted p-4 rounded-xl w-fit mb-6 group-hover:bg-primary/10 transition-colors">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Precision Discovery</h3>
              <p className="text-muted-foreground">
                Advanced filtering and domain-specific categorization to connect solvers with the exact problems they are built to solve.
              </p>
            </div>
            <div className="p-8 rounded-2xl border bg-card hover:border-primary transition-all group">
              <div className="bg-muted p-4 rounded-xl w-fit mb-6 group-hover:bg-primary/10 transition-colors">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">AI Summarization</h3>
              <p className="text-muted-foreground">
                Cut through the noise. Our AI automatically summarizes complex proposals, highlighting key skills and candidate fit scores instantly.
              </p>
            </div>
            <div className="p-8 rounded-2xl border bg-card hover:border-primary transition-all group">
              <div className="bg-muted p-4 rounded-xl w-fit mb-6 group-hover:bg-primary/10 transition-colors">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Milestone Tracking</h3>
              <p className="text-muted-foreground">
                Keep your project on schedule with integrated milestone management and clear status visibility for all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Cpu className="w-6 h-6 text-primary" />
            <span className="text-xl font-headline font-bold">SOLVEBRIDGE</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 SolveBridge Technologies. All rights reserved. Built for the future of problem-solving.
          </p>
        </div>
      </footer>
    </div>
  );
}
