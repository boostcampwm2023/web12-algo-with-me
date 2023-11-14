import * as express from 'express';

import fs from 'node:fs';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Docker!');
});

app.post('/', (req, res) => {
    const {code, a, b} = req.body;

    const result = eval(`${code} solve(${a}, ${b})`);

    res.send(JSON.stringify(result));
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
