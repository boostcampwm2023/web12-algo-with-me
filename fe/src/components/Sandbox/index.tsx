import { css } from '@style/css';

import { useEffect, useState } from 'react';

import { FetchCompetitionProblemResponse, fetchProblems } from '@/apis/problems';
import { BreadCrumb, Link, Logo, Space } from '@/components/Common';
import CompetitionHeader from '@/components/Competition/CompetitionHeader';
import CompetitionProblemSelector from '@/components/Competition/CompetitionProblemSelector';
import { ProblemHeader } from '@/components/Problem/ProblemHeader';
import { SITE } from '@/constants';
import { isNil } from '@/utils/type';

import { sandboxProblemInfo } from './sandbox.problem.info.ts';
import { SandboxProblemContainer } from './SandboxProblemContainer.tsx';
export function Sandbox() {
  const [tabIndex, setTabIndex] = useState(0);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  // const [sandboxProblemInfo, setSandboxProblemInfo] = useState(sandboxProblemInfo);

  const crumbs = [SITE.NAME, '둘러 보기'];
  const [problemsInfo, setProblemsInfo] = useState<FetchCompetitionProblemResponse[]>([]);
  const problemIds = sandboxProblemInfo.problemIds;

  useEffect(() => {
    fetchProblems(problemIds).then((res) => {
      if (isNil(res)) return;
      setProblemsInfo(res as FetchCompetitionProblemResponse[]);
    });
  }, []);

  return (
    <>
      {problemsInfo.length && (
        <>
          <CompetitionHeader>
            <Link to="/">
              <Logo size={48}></Logo>
            </Link>
            <BreadCrumb crumbs={crumbs}></BreadCrumb>
            <Space></Space>
          </CompetitionHeader>
          <ProblemHeader
            className={padVerticalStyle}
            problem={problemsInfo[tabIndex]}
          ></ProblemHeader>
          <div className={competitionStyle}>
            <aside className={asideStyle}>
              <CompetitionProblemSelector
                problemIds={problemIds}
                currentIndex={tabIndex}
                onChangeProblemIndex={setTabIndex}
              />
            </aside>
            <SandboxProblemContainer
              tabIndex={tabIndex}
              problem={problemsInfo[tabIndex]}
              currentProblemIndex={currentProblemIndex}
            />
          </div>
        </>
      )}
    </>
  );
}

const padVerticalStyle = css({
  paddingX: '1rem',
});

const competitionStyle = css({
  flexGrow: '1',
  // overflow: 'hidden',
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
