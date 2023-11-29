import { css, cx } from '@style/css';

import { type HTMLAttributes, useContext } from 'react';

import { SITE } from '@/constants';

import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
import CompetitionBreadCrumb from './CompetitionBreadCrumb';
import { CompetitionContext } from './CompetitionContext';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function CompetitionHeader({ className, ...props }: Props) {
  const { competition } = useContext(CompetitionContext);

  const crumbs = [SITE.NAME, competition.name];

  return (
    <div className={cx(className, headerStyle)} {...props}>
      <CompetitionBreadCrumb crumbs={crumbs} />
      <ViewDashboardButton competitionId={competition.id} />
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
