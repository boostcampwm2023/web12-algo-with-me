interface Props {
  size: string;
}

export default function Logo({ size }: Props) {
  return <img src="/algo.png" alt="logo" width={size} height={size} />;
}
