import type { CompetitionId } from '@/apis/competitions';

type Rank = {
  user: string;
  solved: number;
  score: number;
  problemSet: {
    [key: number]: number | null;
  };
};

type Dashboard = {
  competitionId: CompetitionId;
  totalProblemCount: number;
  ranking: Rank[];
  myRanking: Rank;
};
