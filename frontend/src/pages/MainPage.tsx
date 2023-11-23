import { css } from '@style/css';

import GoToCreateCompetitionButton from '@/components/Main/Buttons/GoToCreateCompetitionButton';
import CompetitionList from '@/components/Main/CompetitionList';
import { SITE } from '@/constants';

function MainPage() {
  return (
    <main className={style}>
      <span className={ProjectNameStyle}>{SITE.NAME} </span>
      <span>{SITE.PAGE_DESCRIPTION} </span>
      <GoToCreateCompetitionButton />
      <CompetitionList />
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
