import React, { useState, useEffect } from 'react';
import mockData from '../mokData.json';

const TestProblem = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // 실제 API 호출 대신 목업 데이터를 사용
    setProblems(mockData.problems);
  }, []);

  return (
    <div>
      <h1>Example Component</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <h2>{problem.title}</h2>
            <p>{problem.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestProblem;
