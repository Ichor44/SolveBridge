
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BrainCircuit, Check, X, FileText, User, Clock, CheckCircle2, Trophy } from 'lucide-react';
import { Proposal } from '@/lib/mock-data';
import Link from 'next/link';

interface ProposalSwiperProps {
  proposals: Proposal[];
  aiSummaries: any[];
}

export default function ProposalSwiper({ proposals, aiSummaries }: ProposalSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<{ id: string; status: 'Accepted' | 'Declined' }[]>([]);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const acceptOpacity = useTransform(x, [50, 150], [0, 1]);
  const declineOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const proposal = proposals[currentIndex];
    if (!proposal) return;

    setHistory([...history, { id: proposal.id, status: direction === 'right' ? 'Accepted' : 'Declined' }]);
    setCurrentIndex(currentIndex + 1);
  };

  const currentProposal = proposals[currentIndex];
  const aiData = currentProposal ? aiSummaries.find(s => s.id === currentProposal.id) : null;

  if (currentIndex >= proposals.length) {
    return (
      <Card className="bg-card p-12 text-center space-y-6 max-w-2xl mx-auto border-primary/20">
        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-headline font-bold">Review Complete!</h2>
        <p className="text-muted-foreground">
          You've reviewed all {proposals.length} candidates.
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="bg-muted p-4 rounded-xl">
            <p className="text-2xl font-headline font-bold text-primary">
              {history.filter(h => h.status === 'Accepted').length}
            </p>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Accepted</p>
          </div>
          <div className="bg-muted p-4 rounded-xl">
            <p className="text-2xl font-headline font-bold text-destructive">
              {history.filter(h => h.status === 'Declined').length}
            </p>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Declined</p>
          </div>
        </div>
        <div className="pt-6">
          <Button asChild className="bg-primary text-background hover:bg-primary/90 font-bold h-12 px-8">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto perspective-1000">
      <div className="absolute -top-12 left-0 right-0 flex justify-between px-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        <span>Candidate {currentIndex + 1} of {proposals.length}</span>
        <span className="text-primary">{proposals.length - currentIndex - 1} Remaining</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentProposal.id}
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) handleSwipe('right');
            else if (info.offset.x < -100) handleSwipe('left');
          }}
          className="cursor-grab active:cursor-grabbing"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ 
            x: x.get() > 0 ? 500 : -500, 
            opacity: 0, 
            scale: 0.5,
            transition: { duration: 0.3 }
          }}
        >
          <Card className="bg-card shadow-2xl border-primary/10 overflow-hidden relative">
            {/* Swipe Indicators */}
            <motion.div 
              style={{ opacity: acceptOpacity }}
              className="absolute top-10 right-10 z-50 border-4 border-primary text-primary font-black text-4xl px-4 py-2 rounded-lg rotate-12 pointer-events-none"
            >
              ACCEPT
            </motion.div>
            <motion.div 
              style={{ opacity: declineOpacity }}
              className="absolute top-10 left-10 z-50 border-4 border-destructive text-destructive font-black text-4xl px-4 py-2 rounded-lg -rotate-12 pointer-events-none"
            >
              DECLINE
            </motion.div>

            <div className="p-8 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center font-bold text-primary text-2xl border-2 border-primary/20">
                  {currentProposal.solverName[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-headline font-bold">{currentProposal.solverName}</h3>
                  <p className="text-sm text-muted-foreground">Submitted {currentProposal.submittedAt}</p>
                </div>
              </div>

              <Separator />

              {/* AI Summary Block */}
              {aiData && !aiData.error && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative">
                  <div className="absolute top-4 right-4 bg-primary text-background text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-glow">
                    <BrainCircuit className="w-3 h-3" /> AI GENERATED
                  </div>
                  <h4 className="font-headline font-bold text-primary flex items-center gap-2 mb-3">
                    AI Insight
                  </h4>
                  <p className="text-sm text-foreground/90 leading-relaxed mb-4 italic">
                    "{aiData.summary}"
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-primary/70 mb-2 uppercase tracking-tighter">Top Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {aiData.keySkills.slice(0, 3).map((skill: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-[10px] uppercase font-bold bg-muted/50 border-none">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background/50 border border-primary/10">
                      <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-tighter">Candidate Fit</p>
                      <div className="flex items-center gap-1">
                        <span className="text-3xl font-headline font-black text-primary">{aiData.candidateFitScore}</span>
                        <span className="text-muted-foreground text-sm">/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-headline font-bold flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-primary" /> Proposed Approach
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-body">
                    {currentProposal.approach}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-headline font-bold flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-primary" /> Timeline
                    </h4>
                    <p className="text-sm text-muted-foreground">{currentProposal.timeline}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-headline font-bold flex items-center gap-2 mb-1">
                      <User className="w-3.5 h-3.5 text-primary" /> Qualifications
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{currentProposal.qualifications}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-center gap-8">
        <Button 
          onClick={() => handleSwipe('left')}
          variant="outline" 
          size="lg" 
          className="w-20 h-20 rounded-full border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all hover:scale-110 shadow-lg"
        >
          <X className="w-8 h-8" />
        </Button>
        <Button 
          onClick={() => handleSwipe('right')}
          size="lg" 
          className="w-20 h-20 rounded-full bg-primary text-background hover:bg-primary/90 transition-all hover:scale-110 shadow-glow"
        >
          <Check className="w-8 h-8" />
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
          Drag card left to reject • Right to accept
        </p>
      </div>
    </div>
  );
}
