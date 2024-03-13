import { cx } from '@style/css';

import type { HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';

import Score from '@/components/Submission/Score';
import { SUBMIT_STATE, type SubmitResult } from '@/components/Submission/types';
import type { SimulationResult } from '@/hooks/simulation';

interface Props extends HTMLAttributes<HTMLUListElement> {
  resultList: SimulationResult[];
}

export function SandboxSubmissionResult({ resultList = [], className, ...props }: Props) {
  const [submitResults, setSubmitResults] = useState<SubmitResult[]>([]);

  function simulationResultToSubmitResult({
    id,
    time,
    memory,
    output,
    expected,
  }: SimulationResult) {
    return {
      problemId: 1,
      testcaseId: id,
      timeUsage: time || 0,
      memoryUsage: memory || 0,
      result: output == expected ? '정답입니다' : '틀렸습니다',
    };
  }

  useEffect(() => {
    setSubmitResults(
      resultList.map((result) => ({
        submitState: result.isDone ? SUBMIT_STATE.submitted : SUBMIT_STATE.loading,
        testcaseId: result.id,
        score: simulationResultToSubmitResult(result),
      })),
    );
  }, [resultList]);

  return (
    <section className={cx(className)} {...props}>
      {submitResults.map(({ testcaseId, score, submitState }, index) => (
        <Score key={testcaseId} testcaseId={index + 1} score={score} submitState={submitState} />
      ))}
    </section>
  );
}
