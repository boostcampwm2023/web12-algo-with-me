import { css } from '@style/css';

import { HStack, Text } from '@/components/Common';
import Logo from '@/components/Common/Logo';
import Header from '@/components/Header';
import GoToCreateCompetitionLink from '@/components/Main/Buttons/GoToCreateCompetitionLink';
import CompetitionList from '@/components/Main/CompetitionList';
import { SITE } from '@/constants';

function MainPage() {
  return (
    <>
      <Header />
      <main className={style}>
        <HStack className={logoAndTitleContainerStyle}>
          <Logo size="360px" />
          <Text type="display" size="lg" className={displayTextStyle}>
            {SITE.NAME}
          </Text>
          <Text type="title" size="lg">
            {SITE.PAGE_DESCRIPTION}
          </Text>
        </HStack>
        <div className={linkWrapperStyle}>
          <GoToCreateCompetitionLink />
        </div>
        <div className={competitionListWrapperStyle}>
          <CompetitionList />
        </div>
      </main>
    </>
  );
}

export default MainPage;

const logoAndTitleContainerStyle = css({
  alignItems: 'center',
  gap: '16px',
  color: '#fff',
});

const displayTextStyle = css({
  height: '100px',
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const style = css({
  background: 'background',
});

const linkWrapperStyle = css({
  width: '100%',
  maxWidth: '1200px',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '1rem 0',
  margin: '0 auto',
});

const competitionListWrapperStyle = css({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});
