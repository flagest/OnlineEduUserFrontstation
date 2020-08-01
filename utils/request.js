import axios from 'axios'
//创建axios实例
const server = axios.create({
  baseURL: 'http://127.0.0.1:9001', //api的base_url
  timeout: 20000 //请求时间
})
export default server
