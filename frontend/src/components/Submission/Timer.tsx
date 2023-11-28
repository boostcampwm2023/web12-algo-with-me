import { css } from '@style/css';

import Loading from '@/components/Common/Loading';
import useTimer from '@/hooks/competition/useTimer';
import { formatTimeFromMiliSeconds } from '@/utils/date';
import type { Socket } from '@/utils/socket';

interface Props {
  socket: Socket;
  endsAt: Date;
  isConnected?: boolean;
}

export default function Timer(props: Props) {
  let { socket, endsAt, isConnected } = props;
  // api 연결이 X endsAt 대신 임시로 만들어놓은 것.
  endsAt = new Date('2023-11-28T13:10:10.000Z');
  const { remainMiliSeconds } = useTimer({ socket, endsAt });

  return (
    <section className={wrapperStyle}>
      <div>
        {isConnected && remainMiliSeconds !== -1 ? (
          <span className={timeTextStyle}>{formatTimeFromMiliSeconds(remainMiliSeconds)}</span>
        ) : (
          <section className={loadingBoxStyle}>
            <span className={disConnectedStyle}>연결 중...</span>
            <Loading color="darkred" size="24px" />
          </section>
        )}
      </div>
    </section>
  );
}

const wrapperStyle = css({
  display: 'flex',
  alignItems: 'center',
});

const disConnectedStyle = css({
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
