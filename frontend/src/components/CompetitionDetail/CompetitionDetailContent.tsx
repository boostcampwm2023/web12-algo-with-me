import { HTMLAttributes } from 'react';

import { CompetitionInfo } from '@/apis/competitions';
import AfterCompetition from '@/components/CompetitionDetail/AfterCompetition';
import BeforeCompetition from '@/components/CompetitionDetail/BeforeCompetition';
import DuringCompetition from '@/components/CompetitionDetail/DuringCompetition';
import { useCompetitionRerender } from '@/hooks/competitionDetail';

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

  const { shouldRerenderDuring, shouldRerenderAfter } = useCompetitionRerender(startsAt, endsAt);

  if ((shouldRerenderAfter && shouldRerenderDuring) || currentDate >= endsAt) {
    return (
      <AfterCompetition className={className} {...{ competitionId, competition }} {...props} />
    );
  }

  if (shouldRerenderDuring || currentDate >= startsAt) {
    return (
      <DuringCompetition className={className} {...{ competitionId, competition }} {...props} />
    );
  }

  return <BeforeCompetition className={className} {...{ competitionId, competition }} {...props} />;
}
