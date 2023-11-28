// CompetitionDetailContent.js
import { CompetitionInfo } from '@/apis/competitions';
import AfterCompetitionEnd from '@/components/CompetitionDetail/AfterCompetitionEnd';
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
    return <BeforeCompetition {...{ competitionId, competition, startsAt, competitionSchedule }} />;
  } else if (currentDate < endsAt) {
    return <DuringCompetition {...{ competitionId, competition, startsAt, competitionSchedule }} />;
  } else {
    return <AfterCompetitionEnd {...{ competitionId, competition, competitionSchedule }} />;
  }
}
