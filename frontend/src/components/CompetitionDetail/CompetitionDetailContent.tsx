import { CompetitionInfo } from '@/apis/competitions';
import AfterCompetition from '@/components/CompetitionDetail/AfterCompetition';
import BeforeCompetition from '@/components/CompetitionDetail/BeforeCompetition';
import DuringCompetition from '@/components/CompetitionDetail/DuringCompetition';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
  startsAt: Date;
  endsAt: Date;
  competitionSchedule: string;
}

export function CompetitionDetailContent({
  competitionId,
  competition,
  startsAt,
  endsAt,
  competitionSchedule,
}: Props) {
  const currentDate = new Date();

  if (currentDate < startsAt) {
    return (
      <BeforeCompetition
        {...{ competitionId, competition, startsAt, endsAt, competitionSchedule }}
      />
    );
  } else if (currentDate < endsAt) {
    return (
      <DuringCompetition
        {...{ competitionId, competition, startsAt, endsAt, competitionSchedule }}
      />
    );
  } else {
    return <AfterCompetition {...{ competitionId, competition, competitionSchedule }} />;
  }
}
