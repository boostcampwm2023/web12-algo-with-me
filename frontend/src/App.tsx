import { Outlet } from 'react-router-dom';

import worker from './__mocks__';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

function App() {
  return <Outlet></Outlet>;
}

export default App;
