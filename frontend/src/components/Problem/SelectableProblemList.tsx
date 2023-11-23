import type { MouseEvent } from 'react';

import type { ProblemId, ProblemInfo } from '@/apis/problems';

interface ProblemListProps {
  problemList: ProblemInfo[];
  pickedProblemIds: ProblemId[];
  onSelectProblem: (problemId: ProblemId) => void;
}

const SelectableProblemList = ({
  problemList,
  pickedProblemIds,
  onSelectProblem,
}: ProblemListProps) => {
  function handleSelectProblem(e: MouseEvent<HTMLUListElement>) {
    const $target = e.target as HTMLElement;
    if ($target.tagName !== 'BUTTON') return;

    const $li = $target.closest('li');
    if (!$li) return;

    const problemId = Number($li.dataset['problemId']);
    onSelectProblem(problemId);
  }

  const getSelectButton = ({ isPicked }: { isPicked: boolean }) => {
    if (isPicked) {
      return <button>취소</button>;
    }
    return <button>선택</button>;
  };

  return (
    <ul onClick={handleSelectProblem}>
      {problemList.map(({ id, title }) => (
        <li key={id} data-problem-id={id}>
          <span>
            {id}: {title}
          </span>
          {getSelectButton({ isPicked: pickedProblemIds.includes(id) })}
        </li>
      ))}
    </ul>
  );
};

export default SelectableProblemList;
