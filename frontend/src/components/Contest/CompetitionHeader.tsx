import { css, cx } from '@style/css';

import type { HTMLAttributes } from 'react';

import { CompetitionId } from '@/apis/competitions';

import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
import ContestBreadCrumb from './ContestBreadCrumb';

interface Props extends HTMLAttributes<HTMLDivElement> {
  crumbs: string[];
  competitionId: CompetitionId;
}

export default function CompetitionHeader({ crumbs, competitionId, className, ...props }: Props) {
  return (
    <div className={cx(className, headerStyle)} {...props}>
      <ContestBreadCrumb crumbs={crumbs} />
      <ViewDashboardButton competitionId={competitionId} />
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
