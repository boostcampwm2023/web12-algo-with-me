import { css } from '@style/css';

import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { HStack, Modal, VStack } from '@/components/Common';
import CompetitionHeader from '@/components/Competition/CompetitionHeader';
import CompetitionProblemSelector from '@/components/Competition/CompetitionProblemSelector';
import { CompetitionProvider } from '@/components/Competition/CompetitionProvider';
import { CompetitionSubmitButton } from '@/components/Competition/CompetitionSubmitButton';
import Editor from '@/components/Editor/Editor';
import { PageLayout } from '@/components/Layout/PageLayout';
import { ProblemHeader } from '@/components/Problem/ProblemHeader';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import { SimulationInputModal } from '@/components/Simulation/SimulationInputModal';
import { SimulationResultList } from '@/components/Simulation/SimulationResultList';
import { SubmissionResult } from '@/components/Submission';
import { useCompetitionProblem } from '@/hooks/problem';
import { useCompetitionProblemList } from '@/hooks/problem/useCompetitionProblemList';
import { SimulationInput, useSimulation } from '@/hooks/simulation';

const RUN_SIMULATION = '테스트 실행';
const CANCEL_SIMULATION = '실행 취소';

export default function CompetitionPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const modal = useContext(Modal.Context);

  const simulation = useSimulation();

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

  const handleSimulate = () => {
    simulation.run(code);
  };

  const handleSimulationCancel = () => {
    simulation.cancel();
  };

  const handleSaveSimulationInputs = (simulationInputs: SimulationInput[]) => {
    simulation.changeInputs(simulationInputs);
  };

  function handleOpenModal() {
    modal.open();
  }

  const problemIds = problemList.map((problem) => problem.id);

  return (
    <PageLayout className={style}>
      <CompetitionProvider competitionId={competitionId}>
        <CompetitionHeader className={padVerticalStyle} />
        <ProblemHeader className={padVerticalStyle} problem={problem}></ProblemHeader>
        <VStack as="section" className={competitionStyle}>
          <aside className={asideStyle}>
            <CompetitionProblemSelector
              problemIds={problemIds}
              onChangeProblemIndex={setCurrentProblemIndex}
            />
          </aside>
          <VStack>
            <ProblemViewer content={problem.content}></ProblemViewer>
            <HStack>
              <Editor code={problem.solutionCode} onChangeCode={handleChangeCode}></Editor>
              <SimulationResultList resultList={simulation.results}></SimulationResultList>
              {simulation.isRunning ? (
                <button className={execButtonStyle} onClick={handleSimulationCancel}>
                  {CANCEL_SIMULATION}
                </button>
              ) : (
                <button className={execButtonStyle} onClick={handleSimulate}>
                  {RUN_SIMULATION}
                </button>
              )}
              <section>
                <SubmissionResult></SubmissionResult>
                <CompetitionSubmitButton
                  code={code}
                  problemId={currentProblem?.id}
                ></CompetitionSubmitButton>
                <button className={execButtonStyle} onClick={handleOpenModal}>
                  테스트 케이스 추가하기
                </button>
              </section>
              <SimulationInputModal
                simulationInputs={simulation.inputs}
                onSave={handleSaveSimulationInputs}
              ></SimulationInputModal>
            </HStack>
          </VStack>
        </VStack>
      </CompetitionProvider>
    </PageLayout>
  );
}

const style = css({
  // overflow: 'hidden',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const competitionStyle = css({ flexGrow: '1', overflow: 'hidden' });
const padVerticalStyle = css({
  paddingX: '1rem',
});

const execButtonStyle = css({
  color: 'black',
});

const asideStyle = css({
  flexShrink: 0,
  borderRight: '1px solid',
  borderColor: 'border',
  padding: '0.5rem',
});
