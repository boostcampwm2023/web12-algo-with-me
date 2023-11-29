import { css } from '@style/css';

import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, HStack, Modal, Space, VStack } from '@/components/Common';
import CompetitionHeader from '@/components/Competition/CompetitionHeader';
import CompetitionProblemSelector from '@/components/Competition/CompetitionProblemSelector';
import { CompetitionProvider } from '@/components/Competition/CompetitionProvider';
import Editor from '@/components/Editor/Editor';
import { PageLayout } from '@/components/Layout/PageLayout';
import { ProblemHeader } from '@/components/Problem/ProblemHeader';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import { SimulationExecButton } from '@/components/Simulation/SimulationExecButton';
import { SimulationInputModal } from '@/components/Simulation/SimulationInputModal';
import { SimulationResultList } from '@/components/Simulation/SimulationResultList';
import { SubmissionButton } from '@/components/Submission/SubmissionButton';
import { SubmissionResult } from '@/components/Submission/SubmissionResult';
import { useCompetitionProblem } from '@/hooks/problem';
import { useCompetitionProblemList } from '@/hooks/problem/useCompetitionProblemList';
import { SimulationInput, useSimulation } from '@/hooks/simulation';

export default function CompetitionPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const { problemList } = useCompetitionProblemList(competitionId);
  const simulation = useSimulation();

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

  const handleSimulate = () => {
    simulation.run(code);
  };

  const handleSimulationCancel = () => {
    simulation.cancel();
  };
  const modal = useContext(Modal.Context);

  const handleSaveSimulationInputs = (simulationInputs: SimulationInput[]) => {
    simulation.changeInputs(simulationInputs);
  };

  function handleOpenModal() {
    modal.open();
  }

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
          <HStack className={css({ height: '100%' })}>
            <VStack className={hfullStyle}>
              <ProblemViewer className={problemStyle} content={problem.content}></ProblemViewer>
              <HStack className={solutionStyle}>
                <Editor
                  height="500px"
                  code={problem.solutionCode}
                  onChangeCode={handleChangeCode}
                ></Editor>
                <section>
                  <SimulationResultList resultList={simulation.results}></SimulationResultList>
                  <SubmissionResult></SubmissionResult>
                </section>
              </HStack>
            </VStack>
            <VStack as="footer" className={footerStyle}>
              <Button onClick={handleOpenModal}>테스트 케이스 추가하기</Button>
              <Space></Space>
              <SimulationExecButton
                isRunning={simulation.isRunning}
                onExec={handleSimulate}
                onCancel={handleSimulationCancel}
              />
              <SubmissionButton code={code} problemId={currentProblem?.id}></SubmissionButton>
            </VStack>
          </HStack>
        </div>
        <SimulationInputModal
          simulationInputs={simulation.inputs}
          onSave={handleSaveSimulationInputs}
        ></SimulationInputModal>
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
  height: 'calc(100% - 50px)',
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

const footerStyle = css({
  height: '50px',
  width: '100%',
  paddingX: '0.5rem',
  gap: '0.5rem',
});
