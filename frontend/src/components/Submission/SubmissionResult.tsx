import { css } from '@style/css';

import { useContext, useEffect, useState } from 'react';

import Connecting from '@/components/Submission/Connecting';
import { range } from '@/utils/array';
import { isNil } from '@/utils/type';

import { CompetitionContext } from '../Competition/CompetitionContext';
import Score from './Score';
import { type Message, type ScoreResult, SUBMIT_STATE, type SubmitState } from './types';

type SubmitResult = {
  testcaseId: number;
  submitState: SubmitState;
  score?: ScoreResult;
};

export function SubmissionResult() {
  const { socket, isConnected } = useContext(CompetitionContext);
  const [scoreResults, setScoreResults] = useState<SubmitResult[]>(
    range(0, 10).map((_, index) => ({
      testcaseId: index + 1,
      submitState: SUBMIT_STATE.loading,
    })),
  );
  const [submissionMessage, setSubmissionMessage] = useState<string>('');

  const handleScoreResult = (
    data: ScoreResult & {
      testcaseId: number;
    },
  ) => {
    const { problemId, result, stdOut, testcaseId } = data;

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

  const handleMessage = (rawData: Message) => {
    const { message, testcaseNum } = rawData;
    setSubmissionMessage(message);
    setScoreResults(
      range(0, testcaseNum).map((_, index) => ({
        testcaseId: index + 1,
        submitState: SUBMIT_STATE.loading,
      })),
    );
  };

  useEffect(() => {
    if (isNil(socket)) return;

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
        <Connecting isConnected={isConnected} />
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
  backgroundColor: 'darkgray',
  margin: '0 auto',
});
