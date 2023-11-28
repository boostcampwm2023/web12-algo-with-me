import { css } from '@style/css';

import Loading from '@/components/Common/Loading';
import useTimer from '@/hooks/competition/useTimer';
import { formatTimeFromMiliSeconds } from '@/utils/date';
import type { Socket } from '@/utils/socket';

interface Props {
  socket: Socket;
  isConnected: boolean;
  endsAt: string;
}

export default function Time(props: Props) {
  let { isConnected, socket, endsAt } = props;
  // api 연결이 X endsAt 대신 임시로 만들어놓은 것.
  endsAt = '2023-11-28T12:10:10.000Z';
  const { remainTime } = useTimer({ socket, endsAt });

  return (
    <section className={wrapperStyle}>
      <div className={positionRightStyle}>
        {isConnected && remainTime !== -1 ? (
          <span className={timeTextStyle}>{formatTimeFromMiliSeconds(remainTime)}</span>
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
  position: 'relative',
});

const disConnectedStyle = css({
  color: 'darkred',
});

const loadingBoxStyle = css({
  display: 'flex',
  gap: '1rem',
});

const positionRightStyle = css({
  display: 'flex',
  position: 'absolute',
  right: '0px',
});

const timeTextStyle = css({
  color: 'lightgray',
  fontWeight: 'bold',
});
