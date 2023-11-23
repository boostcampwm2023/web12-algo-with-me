import { css } from '@style/css';

import GoToCreateCompetitionLink from '@/components/Main/Buttons/GoToCreateCompetitionLink';
import CompetitionList from '@/components/Main/CompetitionList';
import { SITE } from '@/constants';

function MainPage() {
  return (
    <main className={style}>
      <span className={ProjectNameStyle}>{SITE.NAME} </span>
      <span>{SITE.PAGE_DESCRIPTION} </span>
      <GoToCreateCompetitionLink />
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
