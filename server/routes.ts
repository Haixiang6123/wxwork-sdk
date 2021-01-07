import {AxiosRequestConfig } from 'axios';

const baseURL = 'https://qyapi.weixin.qq.com/cgi-bin';

const routes: Record<string, AxiosRequestConfig> = {
  getToken: {
    baseURL,
    url: '/gettoken',
    method: 'GET',
  }
}

export default routes;
