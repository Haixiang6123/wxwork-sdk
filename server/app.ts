import * as express from 'express';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import routes from './routes';
import {GetTokenRes} from './types';
import dayjs = require('dayjs');

dotenv.config();

const app = express();
const port = 1234;
const cacheUrl = path.join(__dirname, './cache.txt');

let accessToken: string | null;
let expires: string | null;

[accessToken, expires] = fs.readFileSync(cacheUrl, 'utf8').split('\n');

app.get('/gettoken', async (req, res) => {
  // 未过期
  if (expires && dayjs().diff(dayjs(expires)) < 0) {
    return res.json({ code: 0, msg: '缓存中读取' });
  }

  const params = {
    corpid: process.env.corp_id,
    corpsecret: process.env.corp_secret
  };

  const response = await axios.request<GetTokenRes>({
    ...routes.getToken,
    params,
  })

  const { access_token, expires_in, errmsg } = response.data;

  if (errmsg) {
    return res.json({ code: 500, msg: '获取失败' });
  }

  // 计算过期时间
  const curtExpires = dayjs().add(expires_in, 'second');
  // 存入缓存中
  [accessToken, expires] = [access_token, curtExpires.toISOString()];
  // 写入文件里
  const cacheText = access_token + '\n' + curtExpires.toISOString();

  fs.writeFileSync(cacheUrl, cacheText, 'utf8');

  return res.json({ code: 0, msg: '企业微信中获取' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})