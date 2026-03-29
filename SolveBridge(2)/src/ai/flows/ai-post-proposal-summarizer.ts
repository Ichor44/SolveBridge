'use server';
/**
 * @fileOverview This file implements a Genkit flow for summarizing solution proposals.
 *
 * - summarizeProposal - A function that generates a concise summary of a solution proposal.
 * - AiPostProposalSummarizerInput - The input type for the summarizeProposal function.
 * - AiPostProposalSummarizerOutput - The return type for the summarizeProposal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPostProposalSummarizerInputSchema = z.object({
  proposalText: z.string().describe('The full text of the solution proposal to be summarized.'),
});
export type AiPostProposalSummarizerInput = z.infer<typeof AiPostProposalSummarizerInputSchema>;

const AiPostProposalSummarizerOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the proposal, highlighting key aspects, proposed approach, and main deliverables.'),
  keySkills: z
    .array(z.string())
    .describe('A list of technical and soft skills demonstrated or explicitly mentioned in the proposal that are relevant to solving the problem.'),
  candidateFitScore: z
    .number()
    .min(1)
    .max(10)
    .describe('A numerical score (from 1 to 10, where 10 is the best fit) indicating how well the candidate seems to fit the problem requirements based on their proposal.'),
});
export type AiPostProposalSummarizerOutput = z.infer<typeof AiPostProposalSummarizerOutputSchema>;

/**
 * Generates a concise summary of a solution proposal, extracting key information
 * such as the proposed approach, key skills, and a candidate fit score.
 *
 * @param input The solution proposal text to be summarized.
 * @returns An object containing the summary, key skills, and candidate fit score.
 */
export async function summarizeProposal(
  input: AiPostProposalSummarizerInput
): Promise<AiPostProposalSummarizerOutput> {
  return summarizeProposalFlow(input);
}

const summarizeProposalPrompt = ai.definePrompt({
  name: 'summarizeProposalPrompt',
  input: {schema: AiPostProposalSummarizerInputSchema},
  output: {schema: AiPostProposalSummarizerOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing solution proposals for engineering, research, or business problems.
Your goal is to help problem posters quickly understand the essence of a proposal, identify relevant skills, and compare candidates.

Please analyze the following solution proposal and provide:
1.  A concise summary of the proposal (focus on the approach, key ideas, and expected outcomes).
2.  A list of up to 5 key skills (technical or soft) demonstrated or mentioned in the proposal that are relevant to problem-solving.
3.  A candidate fit score from 1 to 10 (1 being a poor fit, 10 being an excellent fit) based on how well the proposal aligns with general problem-solving requirements.

Solution Proposal:
{{{proposalText}}}`,
});

const summarizeProposalFlow = ai.defineFlow(
  {
    name: 'summarizeProposalFlow',
    inputSchema: AiPostProposalSummarizerInputSchema,
    outputSchema: AiPostProposalSummarizerOutputSchema,
  },
  async input => {
    const {output} = await summarizeProposalPrompt(input);
    if (!output) {
      throw new Error('Failed to generate proposal summary.');
    }
    return output;
  }
);
