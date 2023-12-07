import { css } from '@style/css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProblemDetail, type Problem, ProblemId } from '@/apis/problems';
import { PageLayout } from '@/components/Layout/PageLayout';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import type { Nil } from '@/utils/type';

function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const problemId = id ? parseInt(id, 10) : -1;
  const [problem, setProblem] = useState<Problem | Nil>(null);
  const [loading, setLoading] = useState(true);

  async function updateProblem(problemId: ProblemId) {
    try {
      setLoading(true);
      const problem = await fetchProblemDetail(problemId);

      setProblem(problem);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    updateProblem(problemId);
  }, [problemId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!problem) {
    return <p>Error loading problem data</p>;
  }
  return (
    <PageLayout className={style}>
      <span className={problemTitleStyle}>{problem.title}</span>
      <ProblemViewer content={problem.content} />
    </PageLayout>
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
