import { css } from '@style/css';

import ResultComponent from '@/components/result/ResultComponent';

import ContestPage from './components/ContestPage';
import worker from './mocks';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const mainTmpStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
});

function App() {
  return (
    <main className={mainTmpStyle}>
      <ContestPage />
      <ResultComponent></ResultComponent>
    </main>
  );
}

export default App;
