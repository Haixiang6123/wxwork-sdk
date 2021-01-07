import * as express from 'express';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import routes from './routes';
import {GetTokenRes} from './types';

dotenv.config();

const app = express();
const port = 1234;
const cacheUrl = path.join(__dirname, './cache');

let accessToken: string | null = null;

app.get('/gettoken', async (req, res) => {
  const cache = fs.readFileSync(cacheUrl, 'utf8');

  if (cache) {
    return res.json({ code: 0, msg: '' });
  }

  const params = {
    corpid: process.env.corp_id,
    corpsecret: process.env.corp_secret
  };

  const response = await axios.request<GetTokenRes>({
    ...routes.getToken,
    params,
  })

  accessToken = response.data.access_token || null;

  fs.writeFileSync(cacheUrl, accessToken, 'utf8');

  return res.json({ code: 0, msg: '' });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})