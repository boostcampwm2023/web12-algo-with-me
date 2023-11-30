import { css } from '@style/css';

import { Button } from '../Common';

interface AsideProps {
  problemIds: number[];
  onChangeProblemIndex: (index: number) => void;
}

export default function CompetitionProblemSelector(props: AsideProps) {
  function handleChangeProblemIndex(index: number) {
    props.onChangeProblemIndex(index);
  }

  return (
    <ul className={listStyle}>
      {props.problemIds.map((id: number, index: number) => (
        <li key={id}>
          <Button className={selectProblemStyle} onClick={() => handleChangeProblemIndex(index)}>
            문제{index + 1}
          </Button>
        </li>
      ))}
    </ul>
  );
}

const listStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

const selectProblemStyle = css({
  color: 'black',
});
