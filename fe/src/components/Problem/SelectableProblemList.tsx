import { css } from '@style/css';

import type { ProblemId, ProblemInfo } from '@/apis/problems';

import { Icon } from '../Common';

interface ProblemListProps {
  problemList: ProblemInfo[];
  onSelectProblem: (problemId: ProblemId) => void;
}

export function SelectableProblemList({ problemList, onSelectProblem }: ProblemListProps) {
  function handleSelectProblem(id: ProblemId) {
    onSelectProblem(id);
  }

  return (
    <table className={tableStyle}>
      <thead>
        <tr className={dividingStyle}>
          <th className={css({ textAlign: 'left' })}>문제 이름</th>
          <th className={css({ width: '80px' })}>문제 추가</th>
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
              <Icon.Plus color="success" onClick={() => handleSelectProblem(id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const tableStyle = css({
  width: '320px',
  padding: '24px 16px',
  tableLayout: 'fixed',
});

const dividingStyle = css({
  borderBottom: '1px solid',
  borderColor: 'border',
});
