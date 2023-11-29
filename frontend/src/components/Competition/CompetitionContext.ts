import { createContext } from 'react';

import type { CompetitionInfo } from '@/apis/competitions';
import { SubmissionForm } from '@/hooks/competition';
import type { Socket } from '@/utils/socket';

interface CompetitionContextProps {
  socket: Socket | null;
  competition: CompetitionInfo;
  isConnected: boolean;
  submitSolution: (form: SubmissionForm) => void;
}

const notFoundCompetition: CompetitionInfo = {
  id: 0,
  name: 'Competition Not Found',
  detail: 'Competition Not Found',
  maxParticipants: 0,
  startsAt: 'Competition Not Found',
  endsAt: 'Competition Not Found',
  createdAt: 'Competition Not Found',
  updatedAt: 'Competition Not Found',
  host: null,
  participants: [],
};

export const CompetitionContext = createContext<CompetitionContextProps>({
  socket: null,
  competition: notFoundCompetition,
  isConnected: false,
  submitSolution: () => {},
});
