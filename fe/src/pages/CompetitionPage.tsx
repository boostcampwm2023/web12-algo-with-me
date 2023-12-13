import { css } from '@style/css';

import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BreadCrumb, Button, Link, Logo, Space } from '@/components/Common';
import { SocketProvider } from '@/components/Common/Socket/SocketProvider';
import CompetitionHeader from '@/components/Competition/CompetitionHeader';
import CompetitionProblemSelector from '@/components/Competition/CompetitionProblemSelector';
import DashboardModal from '@/components/Dashboard/DashboardModal';
import { CompetitionPageLayout } from '@/components/Layout';
import { ProblemHeader } from '@/components/Problem/ProblemHeader';
import { ProblemSolveContainer } from '@/components/Problem/ProblemSolveContainer';
import SocketTimer from '@/components/SocketTimer';
import { UserValidator } from '@/components/UserValidator';
import { SITE } from '@/constants';
import { useCompetition } from '@/hooks/competition';
import { useCompetitionProblem } from '@/hooks/problem';
import { useCompetitionProblemList } from '@/hooks/problem/useCompetitionProblemList';

export default function CompetitionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const { problemList } = useCompetitionProblemList(competitionId);
  const [isDashboardModalOpen, setDashboardModalOpen] = useState(false);

  const openDashboardModal = () => {
    setDashboardModalOpen(true);
  };

  const closeDashboardModal = () => {
    setDashboardModalOpen(false);
  };

  const currentProblem = useMemo(() => {
    if (problemList.length > 0) {
      return problemList[currentProblemIndex];
    }
    return null;
  }, [problemList, currentProblemIndex]);

  const { problem } = useCompetitionProblem(currentProblem?.id ?? -1);

  const problemIds = problemList.map((problem) => problem.id);

  function handleTimeout() {
    navigate(`/competition/detail/${competitionId}`);
  }

  const { competition } = useCompetition(competitionId);

  const crumbs = [SITE.NAME, competition.name ?? ''];

  return (
    <CompetitionPageLayout className={style}>
      <SocketProvider
        transports={['websocket']}
        query={{ competitionId: String(competitionId) }}
        token={localStorage.getItem('accessToken') ?? ''}
        namespace={'competitions'}
      >
        <CompetitionHeader className={padVerticalStyle}>
          <Link to="/">
            <Logo size={48}></Logo>
          </Link>
          <BreadCrumb crumbs={crumbs}></BreadCrumb>
          <Space></Space>
          <Button onClick={openDashboardModal}>대시보드 보기</Button>
          <SocketTimer onTimeout={handleTimeout} endsAt={competition.endsAt} />
        </CompetitionHeader>
        <ProblemHeader className={padVerticalStyle} problem={problem}></ProblemHeader>
        <div className={competitionStyle}>
          <aside className={asideStyle}>
            <CompetitionProblemSelector
              problemIds={problemIds}
              currentIndex={currentProblemIndex}
              onChangeProblemIndex={setCurrentProblemIndex}
            />
          </aside>
          <ProblemSolveContainer
            competitionId={competitionId}
            problem={problem}
            currentProblemIndex={currentProblemIndex}
          ></ProblemSolveContainer>
        </div>
        <DashboardModal
          isOpen={isDashboardModalOpen}
          onClose={closeDashboardModal}
          competitionName={competition.name}
          competitionId={competitionId}
        />
        <UserValidator />
      </SocketProvider>
    </CompetitionPageLayout>
  );
}

const style = css({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const competitionStyle = css({
  flexGrow: '1',
  overflow: 'hidden',
});

const padVerticalStyle = css({
  paddingX: '1rem',
});

const asideStyle = css({
  float: 'left',
  flexShrink: 0,
  borderRight: '1px solid',
  borderColor: 'border',
  padding: '0.5rem',
  width: '5rem',
  height: '100%',
});
