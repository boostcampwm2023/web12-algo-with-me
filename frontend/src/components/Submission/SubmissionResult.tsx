import { css } from '@style/css';

import { useContext, useEffect, useState } from 'react';

import Connecting from '@/components/Submission/Connecting';
import { range } from '@/utils/array';
import { isNil } from '@/utils/type';

import { SocketContext } from '../Common/Socket/SocketContext';
import Score from './Score';
import { type ScoreResult, type ScoreStart, SUBMIT_STATE, type SubmitState } from './types';

type SubmitResult = {
  testcaseId: number;
  submitState: SubmitState;
  score?: ScoreResult;
};

export function SubmissionResult() {
  const { socket, isConnected } = useContext(SocketContext);
  const [scoreResults, setScoreResults] = useState<SubmitResult[]>([]);
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

  const handleScoreStart = (rawData: ScoreStart) => {
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

    if (!socket.hasListeners('scoreStart')) {
      socket.on('scoreStart', handleScoreStart);
    }
    if (!socket.hasListeners('scoreResult')) {
      socket.on('scoreResult', handleScoreResult);
    }
  }, [socket]);

  return (
    <section className={resultWrapperStyle}>
      <h3>
        제출 결과 <Connecting isConnected={isConnected} />
      </h3>
      <p>{submissionMessage}</p>
      {scoreResults.map(({ score, submitState, testcaseId }) => (
        <Score key={testcaseId} score={score} submitState={submitState} />
      ))}
    </section>
  );
}

const resultWrapperStyle = css({
  padding: '24px',
  height: '300px',
  overflow: 'auto',
  margin: '0 auto',
});
