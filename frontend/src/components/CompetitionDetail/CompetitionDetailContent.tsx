import { css } from '@style/css';

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
      <div className={CompetitionDetailContentStyle}>
        <BeforeCompetition
          {...{ competitionId, competition, startsAt, endsAt, competitionSchedule }}
        />
      </div>
    );
  } else if (currentDate < endsAt) {
    return (
      <div className={CompetitionDetailContentStyle}>
        <DuringCompetition
          {...{ competitionId, competition, startsAt, endsAt, competitionSchedule }}
        />
      </div>
    );
  } else {
    return;
    <div className={CompetitionDetailContentStyle}>
      <AfterCompetition {...{ competitionId, competition, competitionSchedule }} />;
    </div>;
  }
}

const CompetitionDetailContentStyle = css({
  paddingTop: '136px',
});
