interface Props {
  size: string;
}

export default function Logo({ size }: Props) {
  // public이란 곳에 리소스 넣어두면 build시에 바로 밑에 생기기 때문에 ./으로 접근 가능합니다.
  return <img src="./algo.png" alt="logo" width={size} height={size} />;
}
