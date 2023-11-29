import type { ReactNode } from 'react';

import { type CompetitionId } from '@/apis/competitions';
import { useCompetition } from '@/hooks/competition';

import { CompetitionContext } from './CompetitionContext';
interface Props {
  children: ReactNode;
  competitionId: CompetitionId;
}

export function CompetitionProvider({ children, competitionId }: Props) {
  const competition = useCompetition(competitionId);

  return (
    <CompetitionContext.Provider
      value={{
        ...competition,
        socket: competition.socket.current,
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
}
