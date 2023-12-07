import { useNavigate } from 'react-router-dom';

import { fetchIsJoinableCompetition } from '@/apis/joinCompetition';
import { Button } from '@/components/Common';
import useAuth from '@/hooks/login/useAuth';

interface Props {
  id: number;
  startsAt: Date;
  endsAt: Date;
}

export default function EnterCompetitionButton({ id, startsAt, endsAt }: Props) {
  const competitionLink = `/competition/${id}`;
  const { isLoggedin } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = async () => {
    const currentTime = new Date();

    if (!isLoggedin) {
      alert('로그인이 필요합니다.');
      navigate('/login');

      return;
    }

    if (currentTime < startsAt) {
      alert('아직 대회가 시작되지 않았습니다. 다시 시도해주세요');
      navigate(0);

      return;
    }

    if (currentTime >= endsAt) {
      alert('해당 대회는 종료되었습니다.');
      navigate(0);

      return;
    }

    const accessToken = localStorage.getItem('accessToken') ?? '';

    const isJoinable = await fetchIsJoinableCompetition(id, accessToken);
    if (!isJoinable) {
      alert('대회에 참여할 수 없습니다.\n다음부터는 늦지 않게 대회 신청을 해주세요 :)');
      return;
    }

    navigate(competitionLink);
  };

  return (
    <Button theme={'brand'} onClick={handleNavigate}>
      대회 입장
    </Button>
  );
}
