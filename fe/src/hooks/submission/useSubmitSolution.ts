import { useState } from 'react';

import { SUBMIT_STATE, type SubmitResult } from '@/components/Submission/types';
import { range } from '@/utils/array';
import type { Socket } from '@/utils/socket';
import { isNil } from '@/utils/type';

import type { SubmissionForm } from '../competition';

export function useSubmitSolution(socket: Socket | null) {
  const [scoreResults, setScoreResults] = useState<SubmitResult[]>([]);

  function submit(form: SubmissionForm) {
    if (isNil(socket)) return;

    socket.emit('submission', form);
  }

  function changeDoneScoreResult(doneResult: SubmitResult) {
    setScoreResults((results) => {
      return results.map((result) => {
        if (result.testcaseId === doneResult.testcaseId) {
          return doneResult;
        }
        return result;
      });
    });
  }

  function toEvaluatingState(testcaseNum: number) {
    setScoreResults(
      range(0, testcaseNum).map((_, index) => ({
        testcaseId: index + 1,
        submitState: SUBMIT_STATE.loading,
      })),
    );
  }

  function emptyResults() {
    setScoreResults([]);
  }

  return {
    submit,
    changeDoneScoreResult,
    toEvaluatingState,
    emptyResults,
    scoreResults,
  };
}
