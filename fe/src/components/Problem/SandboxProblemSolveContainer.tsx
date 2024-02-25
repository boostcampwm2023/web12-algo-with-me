import { css, cva } from '@style/css';

import { useContext, useEffect, useState } from 'react';

import { CompetitionId } from '@/apis/competitions';
import { CompetitionProblem } from '@/apis/problems';
import { Button, HStack, HStackProps, Modal, Space, VStack } from '@/components/Common';
import { useUserCode } from '@/hooks/editor/useUserCode';
import { SimulationInput, useSimulation } from '@/hooks/simulation';
import { pushHiddenCases } from '@/modules/testCompetition/pushHiddenCases';
import { isNil } from '@/utils/type';

import Editor from '../Editor/Editor';
import { SimulationExecButton } from '../Simulation/SimulationExecButton';
import { SimulationInputModal } from '../Simulation/SimulationInputModal';
import { SimulationResultList } from '../Simulation/SimulationResultList';
import { SandboxSubmissionResult } from '../TestCompetition/SandboxSubmissionResult';
import ProblemViewer from './ProblemViewer';

interface Props extends HStackProps {
  currentProblemIndex: number;
  competitionId: CompetitionId;
  problem: CompetitionProblem;
}

const SIMULATION_TAP = 0;
const SUBMISSION_TAP = 1;

const simulationInputCache: Record<`${CompetitionId}|${number}`, SimulationInput[]> = {};

export function SandboxProblemSolveContainer({
  currentProblemIndex,
  competitionId,
  problem,
  ...props
}: Props) {
  const [currentTab, setCurrentTab] = useState(0);
  const [answer, setAnswer] = useState<SimulationInput[]>([]);

  const email = 'test';
  const { code, setCode } = useUserCode({
    userId: email,
    problem,
    competitionId,
    currentProblemIndex,
    save: () => {},
  });

  let testcases: SimulationInput[] = [];
  let extendedTestcases: SimulationInput[] = [];

  if (isNil(simulationInputCache[`${competitionId}|${currentProblemIndex}`])) {
    testcases = problem.testcases;
    extendedTestcases = problem.testcases;
  } else {
    testcases = simulationInputCache[`${competitionId}|${currentProblemIndex}`];
    extendedTestcases = simulationInputCache[`${competitionId}|${currentProblemIndex}`];
  }

  useEffect(() => {
    const updatedAnswer = pushHiddenCases(currentProblemIndex, extendedTestcases);
    setAnswer(updatedAnswer);
  }, [currentProblemIndex, extendedTestcases]);

  const simulation = useSimulation(testcases);
  const submission = useSimulation(answer);

  const handleChangeCode = (newCode: string) => {
    setCode(newCode);
  };

  const handleSimulate = () => {
    setCurrentTab(SIMULATION_TAP);
    simulation.run(code);
  };

  const handleSimulationCancel = () => {
    simulation.cancel();
  };

  const handleSaveSimulationInputs = (simulationInputs: SimulationInput[]) => {
    simulationInputCache[`${competitionId}|${currentProblemIndex}`] = simulationInputs;
    simulation.changeInputs(simulationInputs);
  };

  const modal = useContext(Modal.Context);

  function handleOpenModal() {
    modal.open();
  }

  function handleSubmitSolution() {
    setCurrentTab(SUBMISSION_TAP);
    submission.run(code);
  }

  function handleInitCode() {
    setCode(problem.solutionCode);
  }

  return (
    <HStack className={css({ height: '100%' })} {...props}>
      <VStack className={problemSolveContainerStyle} alignItems="stretch">
        <ProblemViewer className={problemStyle} content={problem.content}></ProblemViewer>
        <HStack className={solutionStyle}>
          <Editor height="50%" code={code} onChangeCode={handleChangeCode}></Editor>
          <section className={resultContainerStyle}>
            <div
              className={css({
                borderRadius: '0.5rem',
                bg: 'surface',
                maxHeight: '100%',
                overflow: 'auto',
              })}
            >
              <SimulationResultList
                className={tabStyle({ visible: currentTab === SIMULATION_TAP })}
                resultList={simulation.results}
              ></SimulationResultList>
              <SandboxSubmissionResult
                className={tabStyle({ visible: currentTab === SUBMISSION_TAP })}
                resultList={submission.results}
              ></SandboxSubmissionResult>
            </div>
          </section>
        </HStack>
      </VStack>
      <VStack as="footer" alignItems="center" className={footerStyle}>
        <Button onClick={handleOpenModal}>테스트 케이스 추가하기</Button>
        <Space></Space>
        <Button onClick={handleInitCode}>코드 초기화하기</Button>
        <SimulationExecButton
          isRunning={simulation.isRunning}
          onExec={handleSimulate}
          onCancel={handleSimulationCancel}
        />
        <Button theme="brand" onClick={handleSubmitSolution}>
          제출하기
        </Button>
      </VStack>
      <SimulationInputModal
        className={simulationModalStyle}
        simulationInputs={simulation.inputs}
        onSave={handleSaveSimulationInputs}
      ></SimulationInputModal>
    </HStack>
  );
}

const problemSolveContainerStyle = css({
  height: 'calc(100% - 4rem)',
  width: 'full',
});

const problemStyle = css({
  width: '1/2',
  height: 'full',
});

const solutionStyle = css({
  width: '1/2',
  height: 'full',
  alignItems: 'stretch',
  overflow: 'auto',
});

const footerStyle = css({
  height: '4rem',
  width: 'full',
  paddingX: '1rem',
  gap: '0.5rem',
  borderTop: '1px solid',
  borderColor: 'border',
  placeItems: 'center',
});

const resultContainerStyle = css({
  height: '50%',
  overflow: 'auto',
  padding: '1rem',
});

const tabStyle = cva({
  variants: {
    visible: {
      true: {
        display: 'block',
      },
      false: {
        display: 'none',
      },
    },
  },
});

const simulationModalStyle = css({
  width: '1000px',
});
