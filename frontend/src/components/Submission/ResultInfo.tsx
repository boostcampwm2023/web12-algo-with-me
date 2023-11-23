import { css } from '@style/css';

import { type SubmitResult } from './types';

interface Props {
  submitResult: SubmitResult;
}

export default function ResultInfo({ submitResult }: Props) {
  const { resultStatus, elapsedTime, memoryUsage } = submitResult;

  if (resultStatus === RESULT_STATUS.correct) {
    return (
      <span className={correctStyle}>
        {RESULT_STATUS_TEXT[RESULT_STATUS.correct]} ({elapsedTime}ms ,{memoryUsage}MB)
      </span>
    );
  }

  if (resultStatus === RESULT_STATUS.inCorrect) {
    return (
      <span className={inCorrectStyle}>
        {RESULT_STATUS_TEXT[RESULT_STATUS.inCorrect]} ({elapsedTime}ms ,{memoryUsage}MB)
      </span>
    );
  }

  if (resultStatus === RESULT_STATUS.timeOut) {
    return <span className={inCorrectStyle}>{RESULT_STATUS_TEXT[RESULT_STATUS.timeOut]}</span>;
  }
}

const RESULT_STATUS = {
  correct: 0,
  inCorrect: 1,
  timeOut: 2,
} as const;

const RESULT_STATUS_TEXT = {
  0: '정답',
  1: '실패',
  2: '실패 (시간 초과)',
} as const;

const THEME = {
  WRONG: 'red',
  CORRECT: 'blue',
} as const;

const correctStyle = css({
  color: THEME.CORRECT,
});

const inCorrectStyle = css({
  color: THEME.WRONG,
});
