import { css } from '@style/css';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { HStack, VStack } from '@/components/Common';
import CompetitionHeader from '@/components/Competition/CompetitionHeader';
import CompetitionProblemSelector from '@/components/Competition/CompetitionProblemSelector';
import { CompetitionProvider } from '@/components/Competition/CompetitionProvider';
import Editor from '@/components/Editor/Editor';
import { PageLayout } from '@/components/Layout/PageLayout';
import { ProblemHeader } from '@/components/Problem/ProblemHeader';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import { Simulator } from '@/components/Simulation';
import { Submission } from '@/components/Submission/Submission';
import { useCompetitionProblem } from '@/hooks/problem';
import { useCompetitionProblemList } from '@/hooks/problem/useCompetitionProblemList';

export default function CompetitionPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const { problemList } = useCompetitionProblemList(competitionId);

  const currentProblem = useMemo(() => {
    if (problemList.length > 0) {
      return problemList[currentProblemIndex];
    }
    return null;
  }, [problemList, currentProblemIndex]);

  const { problem } = useCompetitionProblem(currentProblem?.id ?? -1);

  const [code, setCode] = useState<string>(problem.solutionCode);

  useEffect(() => {
    setCode(problem.solutionCode);
  }, [problem.solutionCode]);

  const handleChangeCode = (newCode: string) => {
    setCode(newCode);
  };

  const problemIds = problemList.map((problem) => problem.id);

  return (
    <PageLayout className={style}>
      <CompetitionProvider competitionId={competitionId}>
        <CompetitionHeader className={padVerticalStyle} />
        <ProblemHeader className={padVerticalStyle} problem={problem}></ProblemHeader>
        <div className={competitionStyle}>
          <aside className={asideStyle}>
            <CompetitionProblemSelector
              problemIds={problemIds}
              onChangeProblemIndex={setCurrentProblemIndex}
            />
          </aside>
          <VStack className={hfullStyle}>
            <ProblemViewer className={problemStyle} content={problem.content}></ProblemViewer>
            <HStack className={solutionStyle}>
              <Editor code={problem.solutionCode} onChangeCode={handleChangeCode}></Editor>
              <section>
                <Simulator code={code}></Simulator>
              </section>
              <section>
                <Submission code={code} problemId={currentProblem?.id}></Submission>
              </section>
            </HStack>
          </VStack>
        </div>
      </CompetitionProvider>
    </PageLayout>
  );
}

const style = css({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const competitionStyle = css({
  flexGrow: '1',
  overflow: 'hidden',
});
const hfullStyle = css({
  height: '100%',
});
const problemStyle = css({
  width: '50%',
  height: '100%',
});
const solutionStyle = css({
  width: '50%',
  overflow: 'auto',
});

const padVerticalStyle = css({
  paddingX: '1rem',
});

const asideStyle = css({
  float: 'left',
  flexShrink: 0,
  borderRight: '1px solid',
  borderColor: 'border',
  padding: '0.5rem',
  height: '100%',
});
