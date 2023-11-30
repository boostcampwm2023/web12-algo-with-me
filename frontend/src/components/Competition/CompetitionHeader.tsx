import { css, cx } from '@style/css';

import { type HTMLAttributes, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Space } from '@/components/Common';
import SocketTimer from '@/components/SocketTimer';
import { ROUTE, SITE } from '@/constants';

import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
import CompetitionBreadCrumb from './CompetitionBreadCrumb';
import { CompetitionContext } from './CompetitionContext';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function CompetitionHeader({ className, ...props }: Props) {
  const navigate = useNavigate();
  const { competition } = useContext(CompetitionContext);
  const crumbs = [SITE.NAME, competition.name];

  function handleTimeout() {
    navigate(`${ROUTE.DASHBOARD}/${competition.id}`);
  }

  return (
    <div className={cx(className, headerStyle)} {...props}>
      <CompetitionBreadCrumb crumbs={crumbs} />
      <Space></Space>
      <ViewDashboardButton competitionId={competition.id} />
      <SocketTimer onTimeout={handleTimeout} />
    </div>
  );
}

const headerStyle = css({
  height: '3.125rem',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid',
  borderColor: 'border',
});
