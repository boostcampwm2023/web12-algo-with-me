import { CompetitionId } from '@/apis/competitions';

export type Rank = {
  user: string;
  solved: number;
  score: number;
  problemSet: {
    [key: number]: number | null;
  };
};

export type Dashboard = {
  competitionId: CompetitionId;
  totalProblemCount: number;
  ranking: Rank[];
  myRanking: Rank;
};
