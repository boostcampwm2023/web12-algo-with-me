import { css } from '@style/css';

import CreateCompetitionButton from '@/commons/Buttons/CreateCompetitionButton';
import MainList from '@/components/Main/MainList';
import { SITE } from '@/constants';

function MainPage() {
  return (
    <main className={style}>
      <span className={ProjectName}>{SITE.NAME} </span>
      <span>{SITE.PAGE_DESCRIPTION} </span>
      <CreateCompetitionButton />
      <MainList />
    </main>
  );
}

export default MainPage;

const ProjectName = css({
  fontSize: '70px',
});

const style = css({
  display: 'grid',
  placeItems: 'center',
  height: '500px',
});
