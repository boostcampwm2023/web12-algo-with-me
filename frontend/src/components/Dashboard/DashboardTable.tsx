import { css } from '@style/css';

import type { Rank } from '@/hooks/dashboard';

interface Props {
  ranks: Rank[];
  totalProblemCount: number;
}

export default function DashboardTable({ ranks, totalProblemCount }: Props) {
  const problemCount = Array.from({ length: totalProblemCount }, (_, index) => index + 1);
  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th className={thTdCommonStyle}>Rank</th>
          <th className={thTdCommonStyle}>User Id</th>
          <th className={thTdCommonStyle}>Score</th>
          {problemCount.map((problemId) => (
            <th key={problemId} className={thTdCommonStyle}>
              problem{problemId}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ranks.map((rank, index) => {
          const problemIds = Object.keys(rank.problemDict);
          return (
            <tr key={rank.email}>
              <td className={thTdCommonStyle}>{index + 1}</td>
              <td className={thTdCommonStyle}>{rank.email}</td>
              <td className={thTdCommonStyle}>{rank.score}</td>
              {problemIds.map((problemId) => {
                return (
                  <td key={problemId} className={thTdCommonStyle}>
                    {rank.problemDict[Number(problemId)] ?? '-'}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const tableStyle = css({
  width: '100%',
  borderCollapse: 'collapse',
  margin: '20px 0',
});

const thTdCommonStyle = css({
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
});
