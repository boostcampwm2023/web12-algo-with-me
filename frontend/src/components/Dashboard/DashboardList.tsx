import { css } from '@style/css';

interface Props {
  userList: Record<
    string,
    {
      'Solved Problems': number;
      'Total Time Spent': number;
      Problems: Record<string, number | null>;
    }
  >;
}

export default function DashboardList({ userList }: Props) {
  const problemIds = Object.keys(userList[Object.keys(userList)[0]].Problems);

  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th className={thTdCommonStyle}>Rank</th>
          <th className={thTdCommonStyle}>Id</th>
          <th className={thTdCommonStyle}>Solved Problems</th>
          <th className={thTdCommonStyle}>Total Time Spent</th>
          {problemIds.map((problemId) => (
            <th key={problemId} className={thTdCommonStyle}>
              problem{problemId}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(userList).map((email, index) => {
          const userData = userList[email];
          return (
            <tr key={email}>
              <td className={thTdCommonStyle}>{index + 1}</td>
              <td className={thTdCommonStyle}>{email}</td>
              <td className={thTdCommonStyle}>{userData['Solved Problems']}</td>
              <td className={thTdCommonStyle}>{userData['Total Time Spent']} mins</td>
              {problemIds.map((problemId) => {
                const timeSpent = userData.Problems[problemId];
                return (
                  <td key={problemId} className={thTdCommonStyle}>
                    {timeSpent !== null ? `${timeSpent} mins` : 'Not attempted'}
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
