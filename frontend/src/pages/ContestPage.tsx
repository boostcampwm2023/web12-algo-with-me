import { css } from '@style/css';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import CompetitionHeader from '@/components/Contest/CompetitionHeader';
import ContestProblemSelector from '@/components/Contest/ContestProblemSelector';
import Editor from '@/components/Editor/Editor';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import { SimulationInputList } from '@/components/Simulation/SimulationInputList';
import { SimulationResultList } from '@/components/Simulation/SimulationResultList';
import { SubmissionResult } from '@/components/Submission';
import { SITE } from '@/constants';
import type { SubmissionForm } from '@/hooks/competition';
import { useCompetition } from '@/hooks/competition';
import { useCompetitionProblem } from '@/hooks/problem';
import { useCompetitionProblemList } from '@/hooks/problem/useCompetitionProblemList';
import { useSimulations } from '@/hooks/simulation';
import { isNil } from '@/utils/type';

const RUN_SIMULATION = '테스트 실행';
const CANCEL_SIMULATION = '실행 취소';

export default function ContestPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const {
    simulationInputs,
    simulationResults,
    isSimulating,
    runSimulation,
    changeInput,
    cancelSimulation,
  } = useSimulations();

  const { socket, competition, submitSolution } = useCompetition(competitionId);
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
    runSimulation(code);
  };

  const handleSimulationCancel = () => {
    cancelSimulation();
  };

  const handleChangeInput = (id: number, newParam: string) => {
    changeInput(id, newParam);
  };

  function handleSubmitSolution() {
    if (isNil(currentProblem)) {
      console.error('존재하지 않는 문제입니다.');
      return;
    }

    const form = {
      problemId: currentProblem.id,
      code,
    } satisfies SubmissionForm;
    submitSolution(form);
  }

  const problems = problemList.map((problem) => problem.id);

  return (
    <main className={style}>
      <CompetitionHeader crumbs={crumbs} id={competitionId} />
      <section>
        <span className={problemTitleStyle}>{problem.title}</span>
      </section>
      <section className={rowListStyle}>
        <ContestProblemSelector
          problemIds={problems}
          onChangeProblemIndex={setCurrentProblemIndex}
        />
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
        <SubmissionResult socket={socket.current}></SubmissionResult>
        <button onClick={handleSubmitSolution}>제출하기</button>
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
