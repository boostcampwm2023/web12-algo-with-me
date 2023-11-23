interface Props {
  size: string;
}

export default function Logo({ size }: Props) {
  return (
    <section>
      <img src="./algo.png" alt="logo" width={size} height={size} />
    </section>
  );
}
