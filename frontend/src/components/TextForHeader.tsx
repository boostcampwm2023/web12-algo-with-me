import { css } from '@style/css';

interface Props {
  title: string;
  problemName: string;
}

const category = 'Algo With Me';
const separator = '>';

export default function TextForHeader(props: Props) {
  const { title, problemName } = props;

  return (
    <div className={titleContainer}>
      {category} {separator} {title} {separator} {problemName}
    </div>
  );
}

const titleContainer = css({
  backgroundColor: 'gray',
  color: 'black',
  padding: '10px',
  width: '850px',
  height: '50px',
  display: 'flex',
});
