import { css } from '@style/css';

import { type SubmitResult } from './ResultList';

export default function ResultInfo({ submitResult }: { submitResult: SubmitResult }) {
  const { resultStatus, elapsedTime, memoryUsage } = submitResult;

  if (resultStatus === RESULT_STATUS.correct) {
    return (
      <span className={correctColor}>
        {RESULT_STATUS_TEXT[resultStatus as 0]} ({elapsedTime}ms ,{memoryUsage}MB)
      </span>
    );
  }

  if (resultStatus === RESULT_STATUS.inCorrect) {
    return (
      <span className={inCorrectColor}>
        {RESULT_STATUS_TEXT[resultStatus as 1]} ({elapsedTime}ms ,{memoryUsage}MB)
      </span>
    );
  }

  if (resultStatus === RESULT_STATUS.timeOut) {
    return <span className={inCorrectColor}>{RESULT_STATUS_TEXT[resultStatus as 2]}</span>;
  }
}

const RESULT_STATUS = {
  correct: 0,
  inCorrect: 1,
  timeOut: 2,
};

const RESULT_STATUS_TEXT = {
  0: '정답',
  1: '실패',
  2: '실패 (시간 초과)',
};

const THEME = {
  WRONG: 'red',
  CORRECT: 'blue',
};

const correctColor = css({
  color: THEME.CORRECT,
});

const inCorrectColor = css({
  color: THEME.WRONG,
});
