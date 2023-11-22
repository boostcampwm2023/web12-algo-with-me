import { css } from '@style/css';

import CreateCompetitionButton from '@/components/Main/Buttons/CreateCompetitionButton';
import MainList from '@/components/Main/MainList';
import { SITE } from '@/constants';

function MainPage() {
  return (
    <main className={style}>
      <span className={ProjectNameStyle}>{SITE.NAME} </span>
      <span>{SITE.PAGE_DESCRIPTION} </span>
      <CreateCompetitionButton />
      <MainList />
    </main>
  );
}

export default MainPage;

const ProjectNameStyle = css({
  fontSize: '70px',
});

const style = css({
  display: 'grid',
  placeItems: 'center',
  height: '500px',
});
