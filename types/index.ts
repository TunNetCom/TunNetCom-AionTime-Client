import { Candidate, Match as PrismaMatch, JobPost } from "@prisma/client";

export interface Match extends PrismaMatch {
  candidate: Pick<Candidate, "id" | "name" | "email">;
}

export interface MatchWithCandidate extends Match {
  candidate: Candidate;
  post: Pick<JobPost, "id" | "title" | "companyName">;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "ONLINE" | "IN_PERSON";
  location?: string;
  meetLink?: string;
  candidateId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CandidateWithRelations extends Candidate {
  meetings: Meeting[];
} 