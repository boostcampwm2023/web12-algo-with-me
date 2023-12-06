import { cx } from '@style/css';

import { HTMLAttributes, useContext, useEffect, useState } from 'react';

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

interface Props extends HTMLAttributes<HTMLElement> {}

export function SubmissionResult({ className, ...props }: Props) {
  const { socket } = useContext(SocketContext);
  const [scoreResults, setScoreResults] = useState<SubmitResult[]>([]);

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
      return results.map((result) => {
        if (result.testcaseId === newResult.testcaseId) {
          return newResult;
        }
        return result;
      });
    });
  };

  const handleScoreStart = (rawData: ScoreStart) => {
    const { testcaseNum } = rawData;
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
    <section className={cx(className)} {...props}>
      {scoreResults.map(({ score, submitState, testcaseId }, index) => (
        <Score key={testcaseId} testcaseId={index + 1} score={score} submitState={submitState} />
      ))}
    </section>
  );
}
