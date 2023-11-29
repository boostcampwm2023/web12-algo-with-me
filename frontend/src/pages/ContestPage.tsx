import { css } from '@style/css';

import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ModalContext } from '@/components/Common/Modal/ModalContext';
import CompetitionHeader from '@/components/Contest/CompetitionHeader';
import ContestProblemSelector from '@/components/Contest/ContestProblemSelector';
import DashboardListModal from '@/components/Dashboard/DashboardListModal';
import Editor from '@/components/Editor/Editor';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import { SimulationInputModal } from '@/components/Simulation/SimulationInputModal';
import { SimulationResultList } from '@/components/Simulation/SimulationResultList';
import SocketTimer from '@/components/SocketTimer';
import { SubmissionResult } from '@/components/Submission';
import { SITE } from '@/constants';
import type { SubmissionForm } from '@/hooks/competition';
import { useCompetition } from '@/hooks/competition';
import { useCompetitionProblem } from '@/hooks/problem';
import { useCompetitionProblemList } from '@/hooks/problem/useCompetitionProblemList';
import { SimulationInput, useSimulation } from '@/hooks/simulation';
import { isNil } from '@/utils/type';

const RUN_SIMULATION = '테스트 실행';
const CANCEL_SIMULATION = '실행 취소';
const DASHBOARD_URL = '/contest/dashboard';
const COMPEITION_PING_TIME = 5 * 1000;
const COMPEITION_SOCKET_EVENT = 'ping';

export default function ContestPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const modal = useContext(ModalContext);
  const dashboardModal = useContext(ModalContext);

  const navigate = useNavigate();

  const simulation = useSimulation();

  const { socket, competition, submitSolution, isConnected } = useCompetition(competitionId);
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

  const crumbs = [SITE.NAME, competition.name, problem.title];

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

  function handleSubmitSolution() {
    if (isNil(currentProblem)) {
      console.error('존재하지 않는 문제입니다.');
      return;
    }

    const form = {
      problemId: currentProblem.id,
      code,
      competitionId,
    } satisfies SubmissionForm;

    submitSolution(form);
  }

  const { endsAt } = competition;

  function handleOpenModal() {
    modal.open();
  }

  function handleOpenDashboardModal() {
    dashboardModal.open();
  }

  function handleTimeout() {
    navigate(`${DASHBOARD_URL}/${competitionId}`);
  }

  const problems = problemList.map((problem) => problem.id);

  return (
    <main className={style}>
      <CompetitionHeader
        crumbs={crumbs}
        id={competitionId}
        onOpenDashboardModal={handleOpenDashboardModal}
      />
      <section className={rowStyle}>
        <span className={problemTitleStyle}>{problem.title}</span>
        <SocketTimer
          socket={socket.current}
          isConnected={isConnected}
          endsAt={new Date(endsAt)}
          pingTime={COMPEITION_PING_TIME}
          socketEvent={COMPEITION_SOCKET_EVENT}
          onTimeout={handleTimeout}
        />
      </section>
      <section className={rowListStyle}>
        <ContestProblemSelector
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
        <SubmissionResult isConnected={isConnected} socket={socket.current}></SubmissionResult>
        <button className={execButtonStyle} onClick={handleSubmitSolution}>
          제출하기
        </button>
        <button className={execButtonStyle} onClick={handleOpenModal}>
          테스트 케이스 추가하기
        </button>
      </section>
      <SimulationInputModal
        simulationInputs={simulation.inputs}
        onSave={handleSaveSimulationInputs}
      ></SimulationInputModal>
      {dashboardModal.isOpen && <DashboardListModal onClose={dashboardModal.close} />}
    </main>
  );
}

const style = css({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
});

const rowListStyle = css({
  display: 'flex',
});

const colListStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

const problemTitleStyle = css({
  display: 'inline-block',
  height: '50px',
  padding: '10px',
  borderBottom: '2px solid white',
});

const execButtonStyle = css({
  color: 'black',
});

const rowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
});
