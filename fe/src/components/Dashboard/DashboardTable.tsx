import { css, cva } from '@style/css';
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
              순위
            </Text>
          </th>
          <th className={headerIdCellStyle}>
            <Text type="title" bold>
              이름
            </Text>
          </th>
          {problemCount.map((problemId) => (
            <th key={problemId} className={headerProblemCellStyle}>
              <Text type="title" bold>
                문제{problemId}
              </Text>
            </th>
          ))}
          <th className={headerScoreCellStyle}>
            <Text type="title" bold>
              총점
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {!isNil(myRank) && (
          <tr className={highlightRowStyle}>
            <td className={centeredCellStyle}>
              <Text type="title" bold>
                {myRank.rank}
              </Text>
            </td>
            <td className={cellStyle}>
              <Text type="title" bold>
                {myRank.email}
              </Text>
            </td>
            {Object.keys(myRank.problemDict).map((problemId) => {
              const solvedValue = myRank.problemDict[Number(problemId)];
              const solvedState = toSolvedState(solvedValue);

              const style = problemCellStyle({
                solvedState,
              });
              return (
                <td key={problemId} className={style}>
                  <Text type="title" bold>
                    {toStateText(solvedState, solvedValue)}
                  </Text>
                </td>
              );
            })}
            <td className={centeredCellStyle}>
              <Text type="title" bold>
                {myRank.score}
              </Text>
            </td>
          </tr>
        )}
        {ranks.map((rank, index) => (
          <tr key={rank.email}>
            <td className={centeredCellStyle}>
              <Text type="title" bold>
                {index + 1}
              </Text>
            </td>
            <td className={cellStyle}>
              <Text type="title" bold>
                {rank.email}
              </Text>
            </td>
            {Object.keys(rank.problemDict).map((problemId) => {
              const solvedValue = rank.problemDict[Number(problemId)];
              const solvedState = toSolvedState(solvedValue);

              const style = problemCellStyle({
                solvedState,
              });
              return (
                <td key={problemId} className={style}>
                  <Text type="title" bold>
                    {toStateText(solvedState, solvedValue)}
                  </Text>
                </td>
              );
            })}
            <td className={centeredCellStyle}>
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

type ProblemValue = null | number;
type ProblemState = 'none' | 'wrong' | 'success';
function toSolvedState(problemValue: ProblemValue): ProblemState {
  if (isNil(problemValue)) {
    return 'none';
  }
  if (problemValue < 0) {
    return 'wrong';
  }
  return 'success';
}
function toStateText(problemState: ProblemState, originValue: ProblemValue) {
  if (problemState === 'none') return '-';
  if (problemState === 'wrong') return '-';

  return originValue;
}

const tableStyle = css({
  width: '100%',
  margin: '0 auto',
  borderCollapse: 'collapse',
});

const defaultCellStyle: SystemStyleObject = {
  height: '64px',
  padding: '12px',
  border: '1px solid',
  borderColor: 'border',
  background: 'surface',
};

const headerRankCellStyle = css(
  {
    minWidth: '40px',
  },
  defaultCellStyle,
);

const headerIdCellStyle = css(
  {
    maxWidth: '20%',
  },
  defaultCellStyle,
);

const headerProblemCellStyle = css(
  {
    maxWidth: '5%',
  },
  defaultCellStyle,
);

const headerScoreCellStyle = css(
  {
    minWidth: '40px',
  },
  defaultCellStyle,
);

const cellStyle = css(defaultCellStyle, {
  background: '',
});

const centeredCellStyle = css(defaultCellStyle, {
  background: '',
  textAlign: 'center',
});

const problemCellStyle = cva({
  base: {
    height: '64px',
    padding: '12px',
    border: '1px solid',
    borderColor: 'border',
    background: 'surface',
  },
  variants: {
    solvedState: {
      wrong: {
        background: 'rgba(226, 54, 54, 0.70)',
      },
      success: {
        background: 'rgba(130, 221, 85, 0.70)',
      },
      none: {
        background: 'transparent',
      },
    },
  },
});

const highlightRowStyle = css({
  border: '2px solid',
  borderColor: 'brand',
});
