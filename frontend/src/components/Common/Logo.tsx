interface Props {
  size: string;
  className?: string;
}

export default function Logo({ size, className }: Props) {
  return <img className={className} src="/algo.png" alt="logo" width={size} height={size} />;
}
