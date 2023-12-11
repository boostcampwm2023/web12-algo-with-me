import { css } from '@style/css';

import type { ProblemId, ProblemInfo } from '@/apis/problems';

import { Icon } from '../Common';

interface SelectedProblemListProps {
  problemList: ProblemInfo[];
  onCancelProblem: (problemId: ProblemId) => void;
}

export function SelectedProblemList({ problemList, onCancelProblem }: SelectedProblemListProps) {
  function handleCancelProblem(id: ProblemId) {
    onCancelProblem(id);
  }

  return (
    <table className={tableStyle}>
      <thead>
        <tr className={dividingStyle}>
          <th className={css({ textAlign: 'left' })}>문제 이름</th>
          <th className={css({ width: '80px' })}>문제 삭제</th>
        </tr>
      </thead>
      <tbody>
        {problemList.map(({ id, title }) => (
          <tr className={dividingStyle}>
            <td className={css({ textAlign: 'left' })}>{title}</td>
            <td
              className={css({
                width: '80px',
                textAlign: 'center',
                cursor: 'pointer',
              })}
            >
              <Icon.Minus color="danger" onClick={() => handleCancelProblem(id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const tableStyle = css({
  width: '320px',
  padding: '1.5rem 1rem',
  tableLayout: 'fixed',
});

const dividingStyle = css({
  borderBottom: '1px solid',
  borderColor: 'border',
});
