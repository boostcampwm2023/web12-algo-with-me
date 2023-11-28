import { Link } from 'react-router-dom';

import { useCompetitionProblemList } from '@/hooks/problem';

interface Props {
  competitionId: number;
}

export default function ProblemList({ competitionId }: Props) {
  const { problemList } = useCompetitionProblemList(competitionId);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>문제 제목</th>
          </tr>
        </thead>
        <tbody>
          {problemList.map((problem) => (
            <tr key={problem.id}>
              <td>{problem.id}</td>
              <td>
                <Link to={`/problem/${problem.id}`}>{problem.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
