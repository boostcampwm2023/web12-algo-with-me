import { css } from '@style/css';

import CreateCompetitionButton from '@/components/Main/Buttons/CreateCompetitionButton';
import CompetitionList from '@/components/Main/CompetitionList';
import { SITE } from '@/constants';

function MainPage() {
  return (
    <main className={style}>
      <span className={ProjectNameStyle}>{SITE.NAME} </span>
      <span>{SITE.PAGE_DESCRIPTION} </span>
      <CreateCompetitionButton />
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
