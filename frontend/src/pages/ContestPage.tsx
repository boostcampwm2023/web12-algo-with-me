import { css } from '@style/css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ContestBreadCrumb from '@/components/Contest/ContestBreadCrumb';
import Editor from '@/components/Editor/Editor';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import { SimulationInputList } from '@/components/Simulation/SimulationInputList';
import { SimulationResultList } from '@/components/Simulation/SimulationResultList';
import SubmissionResult from '@/components/SubmissionResult';
import { SITE } from '@/constants';
import { useSimulations } from '@/hooks/simulation';

import axios from 'axios';

interface Competition {
  id: number;
  name: string;
  detail: string;
  maxParticipants: number;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
}

interface Problem {
  id: number;
  title: string;
  timeLimit: number;
  memoryLimit: number;
  content: string;
  createdAt: string;
  solutionCode: string;
  testcases: string;
}

const notFoundCompetition: Competition = {
  id: 0,
  name: 'Competition Not Found',
  detail: 'Competition Not Found',
  maxParticipants: 0,
  startsAt: 'Competition Not Found',
  endsAt: 'Competition Not Found',
  createdAt: 'Competition Not Found',
  updatedAt: 'Competition Not Found',
};

const notFoundProblem: Problem = {
  id: 0,
  title: 'Problem Not Found',
  timeLimit: 0,
  memoryLimit: 0,
  content: 'The requested problem could not be found.',
  solutionCode: '',
  testcases: '',
  createdAt: new Date().toISOString(),
};

const RUN_SIMULATION = '테스트 실행';
const CANCEL_SIMULATION = '실행 취소';

export default function ContestPage() {
  const {
    simulationInputs,
    simulationResults,
    isSimulating,
    runSimulation,
    changeInput,
    cancelSimulation,
  } = useSimulations();
  const { id } = useParams<{ id: string }>();
  const competitionId = id ? parseInt(id, 10) : null;
  const [competition, setCompetition] = useState<Competition | null>(notFoundCompetition);
  const currentProblemId = 0; // TODO: 문제 선택 로직 작성시 currentProblemId를 바꿀 수 있게 해야함

  const problems = [1, 2, 3]; // TODO: 대회에 해당하는 문제의 id를 유동적으로 채워넣을 수 있게 수정해야함
  const [problemList, setProblemList] = useState<Problem[]>([notFoundProblem]);

  const [code, setCode] = useState<string>(notFoundProblem.solutionCode);

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

  useEffect(() => {
    axios
      .get(`http://101.101.208.240:3000/competitions/${competitionId}`)
      .then((response) => {
        setCompetition(response.data);
      })
      .catch((error) => {
        console.error('Error fetching competition data:', error);
      });
  }, []);

  useEffect(() => {
    const fetchProblems = async () => {
      const problemRequests = problems.map((problemId) =>
        axios.get(`http://101.101.208.240:3000/competitions/problems/${problemId}`),
      );

      try {
        const responses = await Promise.all(problemRequests);
        const newProblemList = responses.map((response) => response.data);
        setProblemList(newProblemList || notFoundProblem);
      } catch (error) {
        console.error('Error fetching problem data:', error);
      }
    };

    fetchProblems();
  }, []);

  const crumbs = [
    SITE.NAME,
    competition?.name || notFoundCompetition.name,
    problemList[currentProblemId].title,
  ];

  return (
    <main className={style}>
      <ContestBreadCrumb crumbs={crumbs} />
      <section>
        <span className={problemTitleStyle}>{problemList[currentProblemId].title}</span>
      </section>
      <section className={rowListStyle}>
        <ProblemViewer content={problemList[currentProblemId].content}></ProblemViewer>
        <div className={colListStyle}>
          <Editor code={code} onChangeCode={handleChangeCode}></Editor>
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
