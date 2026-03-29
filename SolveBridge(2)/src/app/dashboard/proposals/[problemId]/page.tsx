
import Navbar from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { PROBLEMS, PROPOSALS } from '@/lib/mock-data';
import { summarizeProposal } from '@/ai/flows/ai-post-proposal-summarizer';
import ProposalSwiper from '@/components/proposals/ProposalSwiper';
import { notFound } from 'next/navigation';

export default async function ProposalReviewPage({ params }: { params: { problemId: string } }) {
  const problemId = (await params).problemId;
  const problem = PROBLEMS.find(p => p.id === problemId);
  const problemProposals = PROPOSALS.filter(p => p.problemId === problemId);

  if (!problem) return notFound();

  // Pre-fetch AI summaries for the candidates
  const aiSummaries = await Promise.all(
    problemProposals.map(async (prop) => {
      try {
        const summary = await summarizeProposal({ proposalText: prop.approach + " " + prop.qualifications });
        return { id: prop.id, ...summary };
      } catch (e) {
        return { id: prop.id, error: true };
      }
    })
  );

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-1 flex flex-col items-center">
        <div className="mb-12 text-center">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">{problem.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">Review Candidates</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Reviewing solutions for <span className="text-primary font-medium">{problem.title}</span>. 
            Swipe through the proposals to find the best fit.
          </p>
        </div>

        <ProposalSwiper proposals={problemProposals} aiSummaries={aiSummaries} />
      </main>
    </div>
  );
}
