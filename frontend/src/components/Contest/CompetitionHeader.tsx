import { css } from '@style/css';

import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
import ContestBreadCrumb from './ContestBreadCrumb';

interface Props {
  crumbs: string[];
  id: number;
}

export default function CompetitionHeader(props: Props) {
  return (
    <div className={headerStyle}>
      <ContestBreadCrumb crumbs={props.crumbs} />
      <ViewDashboardButton id={props.id} />
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
