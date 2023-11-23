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
  testcaseId: number;
  submitState: SubmitState;
  score?: ScoreResult;
};

export function SubmissionResult({ socket }: Props) {
  const [scoreResults, setScoreResults] = useState<SubmitResult[]>([]);
  const [submissionMessage, setSubmissionMessage] = useState<string>('');

  const handleScoreResult = (rawData: string) => {
    const { problemId, result, stdOut, testcaseId } = JSON.parse(rawData) as ScoreResult & {
      testcaseId: number;
    };

    const newResult = {
      testcaseId,
      submitState: SUBMIT_STATE.submitted,
      score: {
        problemId,
        result,
        stdOut,
      } satisfies ScoreResult,
    };

    setScoreResults((results) => {
      return results.map((result, index) => {
        if (index === newResult.testcaseId) {
          return newResult;
        }
        return result;
      });
    });
  };

  const handleMessage = (rawData: string) => {
    const { message } = JSON.parse(rawData) as Message;
    const totalSubmissionResult = 10;

    setSubmissionMessage(message);
    setScoreResults(
      range(0, totalSubmissionResult).map((_, index) => ({
        testcaseId: index,
        submitState: SUBMIT_STATE.loading,
      })),
    );
  };

  useEffect(() => {
    if (!socket.hasListeners('message')) {
      socket.on('message', handleMessage);
    }
    if (!socket.hasListeners('scoreResult')) {
      socket.on('scoreResult', handleScoreResult);
    }
  }, [socket]);

  return (
    <>
      <section className={resultWrapperStyle}>
        <p>{submissionMessage}</p>
        {scoreResults.map(({ score, submitState, testcaseId }) => (
          <Score key={testcaseId} score={score} submitState={submitState} />
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
