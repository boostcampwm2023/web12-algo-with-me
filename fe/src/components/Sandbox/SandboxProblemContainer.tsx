import { css, cva } from '@style/css';

import { useContext, useEffect, useState } from 'react';

import { FetchCompetitionProblemResponse } from '@/apis/problems';
import { Button, HStack, Modal, Space, VStack } from '@/components/Common';
import Editor from '@/components/Editor/Editor';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import { SimulationExecButton } from '@/components/Simulation/SimulationExecButton';
import { SimulationInputModal } from '@/components/Simulation/SimulationInputModal';
import { SimulationResultList } from '@/components/Simulation/SimulationResultList';
import { testcaseFormatting } from '@/hooks/problem';
// import { ScoreResult, ScoreStart, SUBMIT_STATE } from '@/componenets/Submission/types';
import { SimulationInput } from '@/hooks/simulation';
import { useSimulation } from '@/hooks/simulation';
import { isNil } from '@/utils/type';

interface Props {
  tabIndex: number;
  problem: FetchCompetitionProblemResponse;
}

const SIMULATION_TAP = 0;
const SUBMISSION_TAP = 1;

export function SandboxProblemContainer({ problem, tabIndex }: Props) {
  const [code, setCode] = useState<string>(problem.solutionCode['JavaScript'] as string);

  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (isNil(problem.solutionCode['JavaScript'])) return;
    setCode(problem.solutionCode['JavaScript'] as string);
  }, []);

  const simulation = useSimulation(testcaseFormatting(problem.testcases.data), tabIndex);

  useEffect(() => {
    setCode(problem.solutionCode['JavaScript'] as string);
  }, [tabIndex]);

  const handleSimulate = () => {
    setCurrentTab(SIMULATION_TAP);
    simulation.run(code);
  };

  const handleSimulationCancel = () => {
    simulation.cancel();
  };
  const modal = useContext(Modal.Context);

  const handleOpenModal = () => {
    modal.open();
  };

  const handleInitCode = () => {
    setCode(problem.solutionCode['JavaScript'] as string);
  };

  const handleSaveSimulationInputs = (simulationInputs: SimulationInput[]) => {
    simulation.changeInputs(simulationInputs);
  };

  return (
    <HStack className={css({ height: '100%' })}>
      <VStack className={problemSolveContainerStyle} alignItems="stretch">
        <ProblemViewer content={problem.content} className={problemStyle} />
        <HStack className={solutionStyle}>
          <Editor height="50%" code={code} onChangeCode={setCode} />
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
              {/* <SubmissionResult
                className={tabStyle({ visible: currentTab === SUBMISSION_TAP })}
                submitResults={}
              ></SubmissionResult> */}
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
        <Button
          theme="brand"
          // onClick={handleSubmitSolution}
          // leading={isScoring ? <Icon.Spinner spin /> : undefined}
          // disabled={isScoring}
        >
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
  width: 'full',
  height: 'calc(100% - 4rem)',
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
