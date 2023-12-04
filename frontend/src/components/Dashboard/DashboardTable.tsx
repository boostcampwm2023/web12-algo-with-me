import { css } from '@style/css';

import { useParticipantDashboard } from '@/hooks/dashboard';

export default function DashboardTable() {
  const { ranks, totalProblemCount, myRank } = useParticipantDashboard();
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
        {myRank !== null && (
          <tr>
            <td className={thTdCommonStyle}>{myRank.rank}</td>
            <td className={thTdCommonStyle}>{myRank.email}</td>
            <td className={thTdCommonStyle}>{myRank.score}</td>
            {problemCount.map((problemId) => (
              <td key={problemId} className={thTdCommonStyle}>
                {myRank.problemDict[Number(problemId)] ?? '-'}
              </td>
            ))}
          </tr>
        )}
        {ranks.map((rank, index) => (
          <tr key={rank.email}>
            <td className={thTdCommonStyle}>{index + 1}</td>
            <td className={thTdCommonStyle}>{rank.email}</td>
            <td className={thTdCommonStyle}>{rank.score}</td>
            {problemCount.map((problemId) => (
              <td key={problemId} className={thTdCommonStyle}>
                {rank.problemDict[Number(problemId)] ?? '-'}
              </td>
            ))}
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
