import { css } from '@style/css';

interface AsideProps {
  problemIds: number[];
  onChangeProblemIndex: (index: number) => void;
}

export default function ContestProblemSelector(props: AsideProps) {
  function handleChangeProblemIndex(index: number) {
    props.onChangeProblemIndex(index);
  }

  return (
    <aside className={style}>
      <span>문제 목록</span>
      <ul>
        {props.problemIds.map((id: number, index: number) => (
          <li key={id}>
            <button className={selectProblemStyle} onClick={() => handleChangeProblemIndex(index)}>
              문제 {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

const style = css({
  borderRight: '1px solid',
  borderColor: 'border',
});
const selectProblemStyle = css({
  color: 'black',
});
