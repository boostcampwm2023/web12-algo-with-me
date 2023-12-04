import { ReactNode } from 'react';

import { CompetitionId } from '@/apis/competitions';

export type Rank = {
  rank: ReactNode;
  email: string;
  score: number;
  problemDict: {
    [key: number]: number | null;
  };
};

export type Dashboard = {
  competitionId: CompetitionId;
  totalProblemCount: number;
  rankings: Rank[];
  myRanking: Rank;
};
