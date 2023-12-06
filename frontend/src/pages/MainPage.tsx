import { css } from '@style/css';

import { HStack, Text, VStack } from '@/components/Common';
import { Logo } from '@/components/Common';
import Header from '@/components/Header';
import GoToCreateCompetitionLink from '@/components/Main/Buttons/GoToCreateCompetitionLink';
import CompetitionTable from '@/components/Main/CompetitionTable';
import { SITE } from '@/constants';

function MainPage() {
  return (
    <>
      <Header />
      <main className={style}>
        <HStack className={logoAndTitleContainerStyle}>
          <Logo size="220px" />
          <Text type="display" size="lg" className={displayTextStyle}>
            {SITE.NAME}
          </Text>
          <Text type="title" size="lg">
            {SITE.PAGE_DESCRIPTION}
          </Text>
        </HStack>
        <VStack className={linkWrapperStyle}>
          <GoToCreateCompetitionLink />
        </VStack>
        <section className={competitionTableWrapperStyle}>
          <CompetitionTable />
        </section>
      </main>
    </>
  );
}

export default MainPage;

const logoAndTitleContainerStyle = css({
  alignItems: 'center',
  gap: '16px',
  color: '#fff',
  paddingTop: '120px',
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
  justifyContent: 'flex-end',
  padding: '1rem 0',
  margin: '0 auto',
});

const competitionTableWrapperStyle = css({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});
