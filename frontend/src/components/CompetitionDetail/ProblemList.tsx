import { css } from '@style/css';

import { useCompetitionProblemList } from '@/hooks/problem';

import { Link } from '../Common';
import { Text } from '../Common';

interface Props {
  competitionId: number;
}

export default function ProblemList({ competitionId }: Props) {
  const { problemList } = useCompetitionProblemList(competitionId);

  return (
    <div className={containerStyle}>
      <table className={tableStyle}>
        <thead>
          <tr>
            <th className={headerCellStyle1}>
              <Text type="title" size="lg" bold>
                번호
              </Text>
            </th>
            <th className={headerCellStyle2}>
              <Text type="title" size="lg" bold>
                문제 이름
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {problemList.map((problem) => (
            <tr key={problem.id}>
              <td className={cellStyle}>{problem.id}</td>
              <td className={cellStyle}>
                <Link to={`/problem/${problem.id}`}>{problem.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const containerStyle = css({});

const tableStyle = css({
  width: '100%',
  borderCollapse: 'collapse',
  margin: '20px 0',
});

const headerCellStyle1 = css({
  color: '#fff',
  width: '100px',
  height: '64px',
  borderTop: '1px solid var(--border-default, #455A64)',
  borderBottom: '1px solid var(--border-default, #455A64)',
  background: 'var(--surface-default, #37474F)',
});

const headerCellStyle2 = css({
  color: '#fff',
  height: '64px',
  borderTop: '1px solid var(--border-default, #455A64)',
  borderBottom: '1px solid var(--border-default, #455A64)',
  background: 'var(--surface-default, #37474F)',
});

const cellStyle = css({
  color: '#fff',
  height: '64px',
  borderTop: '1px solid var(--border-default, #455A64)',
  borderBottom: '1px solid var(--border-default, #455A64)',
});
