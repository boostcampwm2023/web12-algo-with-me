import { css } from '@style/css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProblemDetail, type Problem, ProblemId } from '@/apis/problems';
import { HStack } from '@/components/Common';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/Layout/PageLayout';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import type { Nil } from '@/utils/type';

export function ProblemPage() {
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
    <>
      <Header />
      <PageLayout>
        <HStack className={contentStyle}>
          <span className={problemTitleStyle}>{problem.title}</span>
          <ProblemViewer content={problem.content} />
        </HStack>
      </PageLayout>
    </>
  );
}

const contentStyle = css({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});

const problemTitleStyle = css({
  display: 'inline-block',
  height: '50px',
  padding: '10px',
  borderBottom: '2px solid white',
});
