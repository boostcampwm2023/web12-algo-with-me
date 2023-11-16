import express from 'express';

const app = express()
const port = 3000

app.post('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`[algo-with-me-docker] listening at port ${port}`);
})
