import { css } from '@style/css';

import ContestBreadCrumb from './ContestBreadCrumb';

interface Props {
  crumbs: string[];
  id: number;
  onOpenDashboardModal: () => void;
}

export default function CompetitionHeader(props: Props) {
  return (
    <div className={headerStyle}>
      <ContestBreadCrumb crumbs={props.crumbs} />
      <button onClick={props.onOpenDashboardModal}>대시보드 보기</button>
    </div>
  );
}

const headerStyle = css({
  backgroundColor: 'gray',
  color: 'black',
  width: '850px',
  height: '50px',
  display: 'flex',
  justifyContent: 'space-between',
});
