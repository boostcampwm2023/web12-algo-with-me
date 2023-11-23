import { css } from '@style/css';

import { useEffect, useState } from 'react';

import { range } from '@/utils/array';
import type { Socket } from '@/utils/socket';

import Score from './Score';
import type { Message, ScoreResult } from './types';

interface Props {
  socket: Socket;
}

export function SubmissionResult({ socket }: Props) {
  const [scoreResults, setScoreResults] = useState<ScoreResult[]>([]);

  const handleScoreResult = (rawData: string) => {
    const newResult = JSON.parse(rawData) as ScoreResult;

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
    console.log(message);
  };

  useEffect(() => {
    if (!socket.hasListeners('message')) {
      socket.on('message', handleMessage);
      const totalSubmissionResult = 10;
      setScoreResults(
        range(0, totalSubmissionResult).map(() => ({
          problemId: -1,
          result: '',
          stdOut: '',
          testcaseId: -1,
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
        {scoreResults.map((result) => (
          <Score score={result} />
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
