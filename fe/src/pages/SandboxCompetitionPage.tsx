import { css } from '@style/css';

import { useMemo, useState } from 'react';

import { BreadCrumb, Link, Logo, Space } from '@/components/Common';
import CompetitionHeader from '@/components/Competition/CompetitionHeader';
import CompetitionProblemSelector from '@/components/Competition/CompetitionProblemSelector';
import { CompetitionPageLayout } from '@/components/Layout';
import { ProblemHeader } from '@/components/Problem/ProblemHeader';
import { SandboxProblemSolveContainer } from '@/components/Problem/SandboxProblemSolveContainer';
import { UserValidator } from '@/components/UserValidator';
import { SITE } from '@/constants';
import { useCompetitionProblem } from '@/hooks/problem';

export default function SandboxCompetitionPage() {
  const competitionId: number = 2;
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const problemList = [
    {
      id: 1,
      title: 'A+B',
    },
    {
      id: 9,
      title: '달팽이는 올라가고 싶다',
    },
    {
      id: 10,
      title: '피보나치 수의 연속합',
    },
  ];

  const currentProblem = useMemo(() => {
    if (problemList.length > 0) {
      return problemList[currentProblemIndex];
    }
    return null;
  }, [problemList, currentProblemIndex]);

  const { problem } = useCompetitionProblem(currentProblem?.id ?? -1);

  const problemIds = problemList.map((problem) => problem.id);

  const crumbs = [SITE.NAME, 'sandbox'];

  return (
    <CompetitionPageLayout className={style}>
      <CompetitionHeader className={padVerticalStyle}>
        <Link to="/">
          <Logo size={48}></Logo>
        </Link>
        <BreadCrumb crumbs={crumbs}></BreadCrumb>
        <Space></Space>
      </CompetitionHeader>
      <ProblemHeader className={padVerticalStyle} problem={problem}></ProblemHeader>
      <div className={competitionStyle}>
        <aside className={asideStyle}>
          <CompetitionProblemSelector
            problemIds={problemIds}
            currentIndex={currentProblemIndex}
            onChangeProblemIndex={setCurrentProblemIndex}
          />
        </aside>
        <SandboxProblemSolveContainer
          competitionId={competitionId}
          problem={problem}
          currentProblemIndex={currentProblemIndex}
        ></SandboxProblemSolveContainer>
      </div>
      <UserValidator />
    </CompetitionPageLayout>
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

const padVerticalStyle = css({
  paddingX: '1rem',
});

const asideStyle = css({
  float: 'left',
  flexShrink: 0,
  borderRight: '1px solid',
  borderColor: 'border',
  padding: '0.5rem',
  width: '5rem',
  height: '100%',
});
