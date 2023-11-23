import { css } from '@style/css';

interface AsideProps {
  problemIds: number[];
  onCurrentProblemIndex: (index: number) => void;
}

export default function ContestProblemSelector(props: AsideProps) {
  return (
    <aside>
      <span>문제 목록</span>
      <ul>
        {props.problemIds.map((id: number, index: number) => (
          <li key={id}>
            <button
              className={selectProblemStyle}
              onClick={() => props.onCurrentProblemIndex(index)}
            >
              문제 {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

const selectProblemStyle = css({
  color: 'black',
});
