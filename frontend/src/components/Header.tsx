import TextForHeader from './TextForHeader';
interface Props {
  title: string;
  problemName: string;
}

export default function Header(props: Props) {
  const { title, problemName } = props;
  return (
    <div>
      <TextForHeader title={title} problemName={problemName}></TextForHeader>
    </div>
  );
}
