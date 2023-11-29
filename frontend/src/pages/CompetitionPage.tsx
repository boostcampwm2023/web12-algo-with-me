import { css, cx } from '@style/css';

import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ModalContext } from '@/components/Common/Modal/ModalContext';
import CompetitionHeader from '@/components/Competition/CompetitionHeader';
import CompetitionProblemSelector from '@/components/Competition/CompetitionProblemSelector';
import { CompetitionProvider } from '@/components/Competition/CompetitionProvider';
import { CompetitionSubmitButton } from '@/components/Competition/CompetitionSubmitButton';
import Editor from '@/components/Editor/Editor';
import { PageLayout } from '@/components/Layout/PageLayout';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import { SimulationInputModal } from '@/components/Simulation/SimulationInputModal';
import { SimulationResultList } from '@/components/Simulation/SimulationResultList';
import SocketTimer from '@/components/SocketTimer';
import { SubmissionResult } from '@/components/Submission';
import { useCompetitionProblem } from '@/hooks/problem';
import { useCompetitionProblemList } from '@/hooks/problem/useCompetitionProblemList';
import { SimulationInput, useSimulation } from '@/hooks/simulation';

const RUN_SIMULATION = '테스트 실행';
const CANCEL_SIMULATION = '실행 취소';
const DASHBOARD_URL = '/contest/dashboard';
const COMPEITION_PING_TIME = 5 * 1000;
const COMPEITION_SOCKET_EVENT = 'ping';

export default function CompetitionPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const modal = useContext(ModalContext);

  const navigate = useNavigate();

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

  function handleTimeout() {
    navigate(`${DASHBOARD_URL}/${competitionId}`);
  }

  const problems = problemList.map((problem) => problem.id);

  return (
    <PageLayout>
      <CompetitionProvider competitionId={competitionId}>
        <CompetitionHeader className={paddingVerticalStyle} />
        <section
          className={cx(rowListStyle, spaceBetweenStyle, paddingVerticalStyle, underlineStyle)}
        >
          <span className={problemTitleStyle}>{problem.title}</span>
          <SocketTimer
            pingTime={COMPEITION_PING_TIME}
            socketEvent={COMPEITION_SOCKET_EVENT}
            onTimeout={handleTimeout}
          />
        </section>
        <section className={rowListStyle}>
          <CompetitionProblemSelector
            problemIds={problems}
            onChangeProblemIndex={setCurrentProblemIndex}
          />
          <ProblemViewer content={problem.content}></ProblemViewer>
          <div className={colListStyle}>
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
          </div>
        </section>
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
      </CompetitionProvider>
    </PageLayout>
  );
}

const paddingVerticalStyle = css({
  paddingX: '1rem',
});
const rowListStyle = css({
  display: 'flex',
});
const underlineStyle = css({
  borderBottom: '1px solid',
  borderColor: 'border',
});

const spaceBetweenStyle = css({
  justifyContent: 'space-between',
});

const colListStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

const problemTitleStyle = css({
  display: 'inline-block',
  padding: '10px',
  borderBottom: '2px solid',
  borderColor: 'brand',
});

const execButtonStyle = css({
  color: 'black',
});
