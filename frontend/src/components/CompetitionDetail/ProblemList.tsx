import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchCompetitionProblemList, ProblemInfo } from '@/apis/problems';

interface Props {
  competitionId: number;
}

export default function ProblemList(props: Props) {
  const [problems, setProblems] = useState<ProblemInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCompetitionProblemList(props.competitionId);
        setProblems(result);
      } catch (error) {
        console.error('Error fetching competition problems:', error);
      }
    };

    fetchData();
  }, [props.competitionId]);

  return (
    <div>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <Link to={`/problem/${problem.id}`}>{problem.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
