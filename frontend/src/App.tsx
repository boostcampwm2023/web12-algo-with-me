import './App.css';

import { useState } from 'react';

import reactLogo from '@/assets/react.svg';
import { Counter } from '@/components/counter';

import viteLogo from '/vite.svg';
function App() {
  const [count, setCount] = useState(0);
  const handleClickCount = () => setCount((count) => count + 1);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Counter></Counter>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClickCount}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
