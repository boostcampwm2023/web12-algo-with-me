import { css } from '@style/css';

import SubmissionResult from '@/components/SubmissionResult';

import worker from './__mocks__';
import ContestPage from './components/ContestPage';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

function App() {
  return (
    <main className={mainTmpStyle}>
      <ContestPage />
      <SubmissionResult></SubmissionResult>
    </main>
  );
}

export default App;

const mainTmpStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
});