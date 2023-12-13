import { isNumber } from '@/utils/type';

interface Props {
     size: number | `${string}px`;
}

export function Logo({ size }: Props) {
  const logoSize = isNumber(size) ? `${size}px` : size;
  return <img src="/algo.png" alt="logo" width={logoSize} height={logoSize} />;
}
