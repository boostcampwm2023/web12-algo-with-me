import express from 'express';

import child_process from 'node:child_process';

const app = express()
const port = 3000

function execute(cmd) {
  try {
    child_process.execSync(cmd);
    return true;
  }
  catch (error) {
    return false;
  }
};

app.post('/:competitionId/:userId/:problemId', (req, res) => {
  const {competitionId, userId, problemId} = req.params;
  // TODO: 10초 timeout 만들기
  // const result = execute(`/algo-with-me/node-sh/run.sh ${competitionId} ${userId} ${problemId}`);
  execute(`./node-sh/run.sh ${competitionId} ${userId} ${problemId}`) ?
    res.send(JSON.stringify({result: 'SUCCESS', competitionId, userId, problemId})) :
    res.send(JSON.stringify({result: 'FAIL', competitionId, userId, problemId}));
})

app.listen(port, () => {
  console.log(`[algo-with-me-docker] listening at port ${port}`);
})
