import {AxiosRequestConfig } from 'axios';

const baseURL = 'https://qyapi.weixin.qq.com/cgi-bin';

const routes: Record<string, AxiosRequestConfig> = {
  getToken: {
    baseURL,
    url: '/gettoken',
    method: 'GET',
  },
  // 获取企业的 ticket，用于 config
  getCorpJsapiTicket: {
    baseURL,
    url: '/get_jsapi_ticket',
    method: 'GET',
  },
  // 获取应用的 ticket，用于 agentConfig
  getAppJsapiTicket: {
    baseURL,
    url: '/ticket/get',
    method: 'GET',
  }
}

export default routes;
