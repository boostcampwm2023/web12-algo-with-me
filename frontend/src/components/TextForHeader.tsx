import { css } from '@style/css';

import Albbago from '@/logos/Albbago.svg';

interface Props {
  title: string;
  problemName: string;
}

export default function TextForHeader(props: Props) {
  const { title, problemName } = props;
  const category = 'Algo With Me';
  const tt = '>';

  return (
    <div>
      <div className={titleContainer}>
        <img src={Albbago} alt="Albbago Logo" className={logoStyle} />
        {category} {tt} {title} {tt} {problemName}
      </div>
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

const logoStyle = css({
  width: '35px',
  height: '35px',
});
