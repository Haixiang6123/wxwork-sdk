import * as express from 'express';
const app = express();
const port = 1234;

app.get('/', (req, res) => {
  res.json({
    userId: '123'
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})