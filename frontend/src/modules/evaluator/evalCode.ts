import { EvalResult } from './types';

export default function evalCode(code: string, params: string): EvalResult {
  /**
   * @notice 단순하게 코드 실행을 구현하기 위해 임시적으로 eval을 사용하며 다음 테스크에서 eval을 제거하고 quickJS로 대체할 예정입니다.
   */
  const result = eval(`${code}\nsolution(${params})`);

  return {
    result,
  };
}
