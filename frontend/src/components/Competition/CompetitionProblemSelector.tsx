import { css } from '@style/css';

interface AsideProps {
  problemIds: number[];
  onChangeProblemIndex: (index: number) => void;
}

export default function CompetitionProblemSelector(props: AsideProps) {
  function handleChangeProblemIndex(index: number) {
    props.onChangeProblemIndex(index);
  }

  return (
    <aside className={style}>
      <ul className={listStyle}>
        {props.problemIds.map((id: number, index: number) => (
          <li key={id}>
            <button className={selectProblemStyle} onClick={() => handleChangeProblemIndex(index)}>
              문제{index + 1}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

const style = css({
  flexShrink: 0,
  borderRight: '1px solid',
  borderColor: 'border',
  padding: '0.5rem',
});

const listStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

const selectProblemStyle = css({
  color: 'black',
});
