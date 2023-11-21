import Markdown from './Markdown';

interface Props {
  content: string;
}

export default function ProblemViewer(props: Props) {
  const { content } = props;

  return <Markdown markdownContent={content} />;
}
