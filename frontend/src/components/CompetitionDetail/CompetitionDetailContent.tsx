import { HTMLAttributes } from 'react';

import { CompetitionInfo } from '@/apis/competitions';
import AfterCompetition from '@/components/CompetitionDetail/AfterCompetition';
import BeforeCompetition from '@/components/CompetitionDetail/BeforeCompetition';
import DuringCompetition from '@/components/CompetitionDetail/DuringCompetition';

interface Props extends HTMLAttributes<HTMLDivElement> {
  competitionId: number;
  competition: CompetitionInfo;
}

export function CompetitionDetailContent({
  competitionId,
  competition,
  className,
  ...props
}: Props) {
  const currentDate = new Date();
  const startsAt = new Date(competition.startsAt || '');
  const endsAt = new Date(competition.endsAt || '');

  if (currentDate < startsAt) {
    return (
      <BeforeCompetition className={className} {...{ competitionId, competition }} {...props} />
    );
  }

  if (currentDate < endsAt) {
    return (
      <DuringCompetition className={className} {...{ competitionId, competition }} {...props} />
    );
  }

  return <AfterCompetition className={className} {...{ competitionId, competition }} {...props} />;
}
