import { ButtonHTMLAttributes } from 'react';

import { Button } from '@/components/Common';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function OpenDashboardModalButton(props: Props) {
  return <Button onClick={props.onClick}>대시보드 보기</Button>;
}
