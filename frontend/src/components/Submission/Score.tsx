import { css, cva } from '@style/css';

import { Icon, Text, VStack } from '@/components/Common';
import { byteToKB } from '@/utils/unit';

import type { ScoreResult, SubmitState } from './types';
import { SUBMIT_STATE } from './types';

interface Props {
  score?: ScoreResult;
  submitState: SubmitState;
  testcaseId: number;
}

export default function Score({ testcaseId, score, submitState }: Props) {
  if (submitState === SUBMIT_STATE.notSubmitted) {
    return '';
  }

  if (submitState === SUBMIT_STATE.loading) {
    return (
      <VStack className={style}>
        <Icon.Spinner spin />
        테스트케이스{testcaseId}:
      </VStack>
    );
  }

  const isSuccess = score?.result === '정답입니다';
  const { result = '', memoryUsage = 0, timeUsage = 0 } = score ?? {};
  return (
    <VStack className={style}>
      {isSuccess ? <Icon.CheckRound color="success" /> : <Icon.CancelRound color="danger" />}
      <Text.Body size="lg">테스트케이스{testcaseId}:</Text.Body>
      <Text.Body
        size="lg"
        className={resultTextStyle({ status: isSuccess ? 'success' : 'failed' })}
      >
        {result ?? ''} ({`${byteToKB(memoryUsage)}KB, ${(timeUsage / 1000).toFixed(2)}s`})
      </Text.Body>
    </VStack>
  );
}

const style = css({
  borderBottom: '1px solid',
  borderColor: 'border',
  padding: '1rem',
  gap: '1rem',
  _last: {
    borderBottom: '0px',
  },
});

const resultTextStyle = cva({
  variants: {
    status: {
      success: {
        color: 'alert.success',
      },
      failed: {
        color: 'alert.danger',
      },
    },
  },
});
