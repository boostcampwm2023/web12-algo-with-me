import { css } from '@style/css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProblemViewer from '@/components/Problem/ProblemViewer';

import axios from 'axios';

interface Problem {
  id: number;
  title: string;
  timeLimit: number;
  memoryLimit: number;
  content: string;
  createdAt: string;
}

const PROBLEM_API_ENDPOINT = 'http://101.101.208.240:3000/problems/';

function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const problemId = id ? parseInt(id, 10) : null;
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get<Problem>(`${PROBLEM_API_ENDPOINT}${problemId}`);
        const data = response.data;

        setProblem(data);
      } catch (error) {
        console.error('Error fetching problem:', (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!problem) {
    return <p>Error loading problem data</p>;
  }
  return (
    <main className={style}>
      <span className={problemTitleStyle}>{problem.title}</span>
      <ProblemViewer content={problem.content} />
    </main>
  );
}

export default ProblemPage;

const style = css({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
});

const problemTitleStyle = css({
  display: 'inline-block',
  height: '50px',
  padding: '10px',
  borderBottom: '2px solid white',
});
