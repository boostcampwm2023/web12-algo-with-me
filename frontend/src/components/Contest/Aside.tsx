import { css } from '@style/css';

interface AsideProps {
  problemIds: number[];
  setCurrentProblemIndex: (index: number) => void;
}

export default function Aside(props: AsideProps) {
  return (
    <aside>
      <h2>문제 목록</h2>
      <ul>
        {props.problemIds.map((id: number, index: number) => (
          <li key={id}>
            <button
              className={selectProblemStyle}
              onClick={() => props.setCurrentProblemIndex(index)}
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
