const express = require('express');
const child_process = require('node:child_process');

const app = express();
const PORT = 5000;
const TIMEOUT_IN_MILLI = 10_000;

app.post('/:competitionId/:userId/:problemId/:testcaseId', (req, res) => {
  const {competitionId, userId, problemId, testcaseId} = req.params;
  // const result = execute(`/algo-with-me/node-sh/run.sh ${competitionId} ${userId} ${problemId}`); // docker instance용
  // const result = execute(`./node-sh/run.sh ${competitionId} ${userId} ${problemId}`); // local test용
  
  const responseJson = { result: '', competitionId, userId, problemId };
  const command = `/algo-with-me/node-sh/run.sh ${competitionId} ${userId} ${problemId} ${testcaseId}`;
  try {
    child_process.execSync(command, { timeout: TIMEOUT_IN_MILLI });
    responseJson.result = 'SUCCESS';
  } catch (error) {
    responseJson.result = error.code === 'ETIMEDOUT'? 'TIMEOUT' : error.code;
  }
  
  res.send(JSON.stringify(responseJson));
})

app.listen(PORT, () => {
  console.log(`[algo-with-me-docker] listening at port ${PORT}`);
})
