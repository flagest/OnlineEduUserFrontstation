import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import cookie from 'js-cookie'
//创建axios实例
const server = axios.create({
  baseURL: 'http://127.0.0.1:9001', //api的base_url
  timeout: 20000 //请求时间
})
//拦截器
server.interceptors.request.use(
  config => {
    //判断cookie中是否有token值
    if (cookie.get('token')) {
      //把cookie取出来的值放进header中
      config.headers['token'] = cookie.get('token');
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  })

export default server
