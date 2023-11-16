import MswTestComponent from '@/components/result/ResultComponent';

import worker from './mocks';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

function App() {
  return <MswTestComponent></MswTestComponent>;
}

export default App;
