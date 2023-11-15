import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProblemContent = ({ id }) => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`YOUR_API_ENDPOINT/${id}`);
        const data = response.data;

        setProblem(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!problem) {
    return <div>Error loading problem</div>;
  }

  return (
    <div>
      <h1>{problem.title}</h1>
      <p>{problem.content}</p>
    </div>
  );
};

export default ProblemContent;
