import { css } from '@style/css';

import { useCompetitionProblemList } from '@/hooks/problem';

import { Link, Text } from '../Common';

interface Props {
  competitionId: number;
}

export default function ProblemList({ competitionId }: Props) {
  const { problemList } = useCompetitionProblemList(competitionId);

  return (
    <div>
      <table className={tableStyle}>
        <thead>
          <tr>
            <th className={headerNumberCellStyle}>
              <Text type="title" size="lg" bold>
                번호
              </Text>
            </th>
            <th className={headerTitleCellStyle}>
              <Text type="title" size="lg" bold>
                문제 이름
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {problemList.map((problem) => (
            <tr key={problem.id}>
              <td className={numberCellStyle}>{problem.id}</td>
              <td className={titleCellStyle}>
                <Link to={`/problem/${problem.id}`}>{problem.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle = css({
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '60px',
});

const headerNumberCellStyle = css({
  width: '100px',
  height: '64px',
  border: '1px solid',
  borderColor: 'border',
  background: 'surface',
});

const headerTitleCellStyle = css({
  height: '64px',
  border: '1px solid',
  borderColor: 'border',
  background: 'surface',
  textAlign: 'left',
  padding: '16px',
});

const numberCellStyle = css({
  height: '64px',
  padding: '16px',
  textAlign: 'center',
  border: '1px solid',
  borderColor: 'border',
});

const titleCellStyle = css({
  height: '64px',
  padding: '16px',
  border: '1px solid',
  borderColor: 'border',
});
