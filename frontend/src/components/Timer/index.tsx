import { css } from '@style/css';

import { useNavigate } from 'react-router-dom';

import Loading from '@/components/Common/Loading';
import useTimer from '@/hooks/timer/useTimer';
import { formatMilliSecond } from '@/utils/date';
import type { Socket } from '@/utils/socket';

interface Props {
  socket: Socket;
  endsAt: Date;
  isConnected: boolean;
  [key: string]: unknown;
}

const DASHBOARD_URL = '/contest/dashboard';

export default function Timer(props: Props) {
  const navigate = useNavigate();

  let { socket, endsAt, isConnected, ...rest } = props;
  // api 연결이 X endsAt 대신 임시로 만들어놓은 것.
  // min 1 => 60초 동안 돌아갑니다. 변경해서 쓰세요 일단은..
  const min = 1;
  endsAt = new Date(new Date().getTime() + min * 60 * 1000);

  const onTimeoutHandler = () => {
    navigate(`${DASHBOARD_URL}/${rest.competitionId}`);
  };

  const { remainMiliSeconds } = useTimer({ socket, endsAt, onTimeoutHandler });

  if (isConnected && remainMiliSeconds !== -1) {
    // 연결도 되어있고, 서버 시간도 도착해서 count down을 시작할 수 있을 때
    return (
      <section className={wrapperStyle}>
        <div>
          <span className={timeTextStyle}>{formatMilliSecond(remainMiliSeconds, 'hh:mm:ss')}</span>
        </div>
      </section>
    );
  }

  return (
    <section className={wrapperStyle}>
      <div>
        <section className={loadingBoxStyle}>
          <span className={disconnectedStyle}>연결 중...</span>
          <Loading color="darkred" size="24px" />
        </section>
      </div>
    </section>
  );
}

const wrapperStyle = css({
  display: 'flex',
  alignItems: 'center',
});

const disconnectedStyle = css({
  color: 'darkred',
});

const loadingBoxStyle = css({
  display: 'flex',
  gap: '1rem',
});

const timeTextStyle = css({
  color: 'lightgray',
  fontWeight: 'bold',
});
