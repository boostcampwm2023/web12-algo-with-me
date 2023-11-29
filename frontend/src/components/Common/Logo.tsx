interface Props {
  size: string;
}

export default function Logo({ size }: Props) {
  // public이란 곳에 리소스 넣어두면 build시에 바로 밑에 생기기 때문에 ./으로 접근 가능합니다.
  // MainPage에서는 logo를 불러올 수 있는데, CompetitionDetailPage에서 불러오지 못해 아래와 같이 변경(이우찬)
  return <img src="../../../public/algo.png" alt="logo" width={size} height={size} />;
}
