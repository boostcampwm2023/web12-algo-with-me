import { css } from '@style/css';

import type { Rank } from '@/hooks/dashboard/types';
import { isNil } from '@/utils/type';

interface Props {
  ranks: Rank[];
  myRank: Rank | null;
  problemCount: number[];
}

export default function DashboardTable({ ranks, myRank, problemCount }: Props) {
  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th className={thTdCommonStyle}>Rank</th>
          <th className={thTdCommonStyle}>User Id</th>
          {problemCount.map((problemId) => (
            <th key={problemId} className={thTdCommonStyle}>
              problem{problemId}
            </th>
          ))}
          <th className={thTdCommonStyle}>Score</th>
        </tr>
      </thead>
      <tbody>
        {!isNil(myRank) && (
          <tr>
            <td className={thTdCommonStyle}>{myRank.rank}</td>
            <td className={thTdCommonStyle}>{myRank.email}</td>
            {problemCount.map((problemId) => (
              <td key={problemId} className={thTdCommonStyle}>
                {myRank.problemDict[Number(problemId)] ?? '-'}
              </td>
            ))}
            <td className={thTdCommonStyle}>{myRank.score}</td>
          </tr>
        )}
        {ranks.map((rank, index) => (
          <tr key={rank.email}>
            <td className={thTdCommonStyle}>{index + 1}</td>
            <td className={thTdCommonStyle}>{rank.email}</td>
            {problemCount.map((problemId) => (
              <td key={problemId} className={thTdCommonStyle}>
                {rank.problemDict[Number(problemId)] ?? '-'}
              </td>
            ))}
            <td className={thTdCommonStyle}>{rank.score}</td>
          </tr>
        ))}
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
