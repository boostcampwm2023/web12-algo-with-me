import { css } from '@style/css';
import { SystemStyleObject } from '@style/types';

import { useParticipantDashboard } from '@/hooks/dashboard';
import useAuth from '@/hooks/login/useAuth';
import { range } from '@/utils/array';
import { isNil } from '@/utils/type';

import { Text } from '../Common';

interface Props {
  useWebsocket: boolean;
  competitionId: number;
}

export default function DashboardTable({ useWebsocket, competitionId }: Props) {
  const { email } = useAuth();

  const { ranks, myRank, totalProblemCount } = useParticipantDashboard(
    useWebsocket,
    competitionId,
    email,
  );

  const problemCount = range(1, totalProblemCount + 1);

  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th className={headerRankCellStyle}>
            <Text type="title" bold>
              Rank
            </Text>
          </th>
          <th className={headerIdCellStyle}>
            <Text type="title" bold>
              User Id
            </Text>
          </th>
          {problemCount.map((problemId) => (
            <th key={problemId} className={headerProblemCellStyle}>
              <Text type="title" bold>
                problem{problemId}
              </Text>
            </th>
          ))}
          <th className={headerScoreCellStyle}>
            <Text type="title" bold>
              Score
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {!isNil(myRank) && (
          <tr>
            <td className={myRankCellStyle}>
              <Text type="title" bold>
                {myRank.rank}
              </Text>
            </td>
            <td className={myRankCellStyle}>
              <Text type="title" bold>
                {myRank.email}
              </Text>
            </td>
            {problemCount.map((problemId) => (
              <td
                key={problemId}
                className={
                  isNil(myRank.problemDict[Number(problemId)])
                    ? nullProblemCellStyle
                    : ProblemCellStyle
                }
              >
                <Text type="title" bold>
                  {myRank.problemDict[Number(problemId)] ?? '-'}
                </Text>
              </td>
            ))}
            <td className={myRankCellStyle}>
              <Text type="title" bold>
                {myRank.score}
              </Text>
            </td>
          </tr>
        )}
        {ranks.map((rank, index) => (
          <tr key={rank.email}>
            <td className={cellStyle}>
              <Text type="title" bold>
                {index + 1}
              </Text>
            </td>
            <td className={cellStyle}>
              <Text type="title" bold>
                {rank.email}
              </Text>
            </td>
            {problemCount.map((problemId) => (
              <td
                key={problemId}
                className={
                  isNil(rank.problemDict[Number(problemId)])
                    ? nullProblemCellStyle
                    : ProblemCellStyle
                }
              >
                <Text type="title" bold>
                  {rank.problemDict[Number(problemId)] ?? '-'}
                </Text>
              </td>
            ))}
            <td className={cellStyle}>
              <Text type="title" bold>
                {rank.score}
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const tableStyle = css({
  width: '1200px',
  margin: '0 auto',
});

const commonCellStyle: SystemStyleObject = {
  height: '64px',
  padding: '16px',
  border: '1px solid',
  borderColor: 'border',
  background: 'surface',
};

const headerRankCellStyle = css(
  {
    width: '100px',
  },
  commonCellStyle,
);

const headerIdCellStyle = css(
  {
    width: '200px',
  },
  commonCellStyle,
);

const headerProblemCellStyle = css(
  {
    width: '150px',
  },
  commonCellStyle,
);

const headerScoreCellStyle = css(
  {
    width: '120px',
  },
  commonCellStyle,
);

const myRankCellStyle = css(commonCellStyle, {
  background: '',
});

const cellStyle = css(commonCellStyle, {
  background: '',
});

const nullProblemCellStyle = css(commonCellStyle, {
  background: 'alert.danger.light',
});

const ProblemCellStyle = css(commonCellStyle, {
  background: 'alert.success.light',
});
