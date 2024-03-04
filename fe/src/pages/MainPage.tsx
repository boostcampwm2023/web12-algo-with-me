import { css } from '@style/css';

import { HStack, Logo, Text, VStack } from '@/components/Common';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/Layout';
import { CompetitionTable, CreateCompetitionButton, SandboxButton } from '@/components/Main';
import { SITE } from '@/constants';

export function MainPage() {
  return (
    <>
      <Header />
      <PageLayout>
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
          <SandboxButton />
          <CreateCompetitionButton />
        </VStack>
        <section className={competitionTableWrapperStyle}>
          <CompetitionTable />
        </section>
      </PageLayout>
    </>
  );
}

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

const linkWrapperStyle = css({
  width: '100%',
  maxWidth: '1200px',
  justifyContent: 'flex-end',
  padding: '1rem 0',
  margin: '0 auto',
  gap: '1rem',
});

const competitionTableWrapperStyle = css({
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});
