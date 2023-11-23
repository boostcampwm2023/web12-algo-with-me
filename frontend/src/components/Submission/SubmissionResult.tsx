import { css } from '@style/css';

import { useEffect, useState } from 'react';

import { range } from '@/utils/array';
import type { Socket } from '@/utils/socket';

import Score from './Score';
import { type Message, type ScoreResult, SUBMIT_STATE, type SubmitState } from './types';

interface Props {
  socket: Socket;
}

type SubmitResult = {
  submitState: SubmitState;
  score: ScoreResult;
};

export function SubmissionResult({ socket }: Props) {
  const [scoreResults, setScoreResults] = useState<SubmitResult[]>([]);

  const handleScoreResult = (rawData: string) => {
    const newResult = {
      submitState: SUBMIT_STATE.submitted,
      score: JSON.parse(rawData) as ScoreResult,
    };

    setScoreResults((results) => {
      return results.map((result, index) => {
        if (index === newResult.score.testcaseId) {
          return newResult;
        }
        return result;
      });
    });
  };

  const handleMessage = (rawData: string) => {
    const { message } = JSON.parse(rawData) as Message;
    console.log(message);
  };

  useEffect(() => {
    if (!socket.hasListeners('message')) {
      socket.on('message', handleMessage);
      const totalSubmissionResult = 10;
      setScoreResults(
        range(0, totalSubmissionResult).map((_, index) => ({
          submitState: SUBMIT_STATE.loading,
          score: {
            problemId: -1,
            result: '',
            stdOut: '',
            testcaseId: index,
          },
        })),
      );
    }
    if (!socket.hasListeners('scoreResult')) {
      socket.on('scoreResult', handleScoreResult);
    }
  }, [socket]);

  return (
    <>
      <section className={resultWrapperStyle}>
        {scoreResults.map(({ score, submitState }) => (
          <Score key={score.testcaseId} score={score} submitState={submitState} />
        ))}
      </section>
    </>
  );
}

const resultWrapperStyle = css({
  padding: '24px',
  minHeight: '40vh',
  width: '80vw',
  backgroundColor: 'darkgray',
  margin: '0 auto',
});
