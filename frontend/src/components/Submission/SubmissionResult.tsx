import { cx } from '@style/css';

import { HTMLAttributes } from 'react';

import Score from './Score';
import type { SubmitResult } from './types';

interface Props extends HTMLAttributes<HTMLElement> {
  submitResults: SubmitResult[];
}

export function SubmissionResult({ className, submitResults = [], ...props }: Props) {
  return (
    <section className={cx(className)} {...props}>
      {submitResults.map(({ score, submitState, testcaseId }, index) => (
        <Score key={testcaseId} testcaseId={index + 1} score={score} submitState={submitState} />
      ))}
    </section>
  );
}
