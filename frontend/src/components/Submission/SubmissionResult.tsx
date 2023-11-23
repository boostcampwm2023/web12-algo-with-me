import { css } from '@style/css';

interface Props {
  onSubmit: () => void;
}

export function SubmissionResult({ onSubmit }: Props) {
  const handleClickSubmit = () => {
    onSubmit();
  };

  return (
    <>
      <section className={resultWrapperStyle}></section>
      <button onClick={handleClickSubmit}>제출버튼</button>
    </>
  );
}

const resultWrapperStyle = css({
  padding: '24px',
  minHeight: '40vh',
  width: '80vw',
  backgroundColor: 'darkgray',
  margin: '0 auto',
});
