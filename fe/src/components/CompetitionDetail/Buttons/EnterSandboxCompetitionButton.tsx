import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Common';

export default function EnterSandboxCompetitionButton() {
  const competitionLink = `/competition/Sandbox`;
  const navigate = useNavigate();

  const handleNavigate = async () => {
    navigate(competitionLink);
  };

  return (
    <Button theme={'brand'} onClick={handleNavigate}>
      테스트 대회 입장
    </Button>
  );
}
