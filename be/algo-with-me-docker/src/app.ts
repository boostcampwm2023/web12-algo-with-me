import express from 'express';

import child_process from 'node:child_process';

const app = express();
const PORT = 5000;
const TIMEOUT_IN_MILLI = 10_000;

function execute(cmd: string) {
  return new Promise<boolean>((resolve, reject) => {
    child_process.exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(stderr));
      }
      resolve(true);
    })
  });
}

function getTimer(timeoutInMilli: number): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {reject(new Error('TIMEOUT'));}, timeoutInMilli);
  })
}

app.post('/:competitionId/:userId/:problemId/:testcaseId', (req, res) => {
  const {competitionId, userId, problemId, testcaseId} = req.params;
  // const result = execute(`/algo-with-me/node-sh/run.sh ${competitionId} ${userId} ${problemId}`); // docker instance용
  // const result = execute(`./node-sh/run.sh ${competitionId} ${userId} ${problemId}`); // local test용
  
  const responseJson = { result: '', competitionId, userId, problemId };
  Promise.race([
    execute(`/algo-with-me/node-sh/run.sh ${competitionId} ${userId} ${problemId} ${testcaseId}`),
    getTimer(TIMEOUT_IN_MILLI),
  ]).then(() => {
    responseJson.result = 'SUCCESS';
  }).catch((error) => {
    responseJson.result = error.message;
  }).finally(() => {
    res.send(JSON.stringify(responseJson));
  });
})

app.listen(PORT, () => {
  console.log(`[algo-with-me-docker] listening at port ${PORT}`);
})
