import { css } from '@style/css';

import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import CompetitionPageHeader from '@/components/Contest/CompetitionPageHeader';
import Editor from '@/components/Editor/Editor';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import { SimulationInputList } from '@/components/Simulation/SimulationInputList';
import { SimulationResultList } from '@/components/Simulation/SimulationResultList';
import SubmissionResult from '@/components/SubmissionResult';
import { SITE } from '@/constants';
import { useCompetition } from '@/hooks/competition/useCompetition';
import { useProblem } from '@/hooks/problem/useProblem';
import { useSimulations } from '@/hooks/simulation';

const RUN_SIMULATION = '테스트 실행';
const CANCEL_SIMULATION = '실행 취소';

export default function ContestPage() {
  const { id } = useParams<{ id: string }>();
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const {
    simulationInputs,
    simulationResults,
    isSimulating,
    runSimulation,
    changeInput,
    cancelSimulation,
  } = useSimulations();
  const competitionId: number = id ? parseInt(id, 10) : -1;

  const { problems, competition } = useCompetition(competitionId);
  const currentProblemId = useMemo(() => {
    return problems[currentProblemIndex];
  }, [problems, currentProblemIndex]);

  const { problem } = useProblem(currentProblemId);

  const [code, setCode] = useState<string>(problem.solutionCode);

  const crumbs = [SITE.NAME, competition.name, problem.title];

  const handleChangeCode = (newCode: string) => {
    setCode(newCode);
  };

  const handleSimulate = () => {
    runSimulation(code);
  };

  const handleSimulationCancel = () => {
    cancelSimulation();
  };

  const handleChangeInput = (id: number, newParam: string) => {
    changeInput(id, newParam);
  };

  const handleNextProblem = () => {
    setCurrentProblemIndex(currentProblemIndex + 1);
  };

  return (
    <main className={style}>
      <button onClick={handleNextProblem}>다음 문제</button>
      <CompetitionPageHeader crumbs={crumbs} id={competitionId} />
      <section>
        <span className={problemTitleStyle}>{problem.title}</span>
      </section>
      <section className={rowListStyle}>
        <ProblemViewer content={problem.content}></ProblemViewer>
        <div className={colListStyle}>
          <Editor code={problem.solutionCode} onChangeCode={handleChangeCode}></Editor>
          <SimulationInputList
            inputList={simulationInputs}
            onChangeInput={handleChangeInput}
          ></SimulationInputList>
          <SimulationResultList resultList={simulationResults}></SimulationResultList>
          {isSimulating ? (
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
      </section>
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
