import axios from 'axios'
import Qs from 'qs'
import { compose } from 'ramda'
import Router from '../router'
// import UUID from "uuid-js";
// import md5 from "js-md5";
import store from '../store'
import { message } from 'ant-design-vue'

const service = axios.create({
  baseURL: '/devops',
  timeout: 60000,
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    // const uuid = UUID.create();
    const timestamp = new Date().getTime()
    // config.headers["X_REQUEST_ID"] = uuid;
    config.headers['X_TIME_STAMP'] = timestamp
    // config.headers["X_REQUEST_SIGN"] = md5(
    //   uuid + "&" + timestamp + "&ddCp09aCA!T!CZ65"
    // );
    return config
  },
  error => {
    message.error(error.message || '异常')
    return Promise.reject(new Error({ code: -1, message: error }))
  }
)

const env = [
  // 'development',
  'test',
  'show',
  'production'
]

const ErrorCode = [1]

service.interceptors.response.use(
  response => {
    if (response.data.code === 200) {
      console.log('response', response)
      return Promise.resolve(response.data.data)
    } else if (ErrorCode.indexOf(response.data.code) > -1) {
      message.error(response.data.message)
    }

    // if (response.data.code === 30203) {
    //   if (env.includes(process.env.VUE_APP_ENV)) {
    //     store.dispatch("GenerateUserInfo", {});
    //     store.commit("SET_LOGIN", false);
    //     loginPanel(); //本地调试 政务网不支持 - -  用该项目内的原登录页面↓↓↓
    //   } else {
    //     store.dispatch("GenerateUserInfo", {});
    //     store.commit("SET_LOGIN", false);
    //     // Router.push({ path: '/personal/login' })
    //   }
    // } else if (
    //   response.config.url == "/attestationDetailInfo/search" &&
    //   response.data.code == 10010
    // ) {
    //   //查找认证用户无该用户 不弹统一报错信息
    // } else {
    //   Message({
    //     showClose: true,
    //     message: response.data.message,
    //     type: "error"
    //   });
    // }
    return Promise.reject(response.data)
  },
  error => {
    if (
      error.code === 'ECONNABORTED' &&
      error.message.indexOf('timeout') !== -1
    ) {
      message.error('网络好像出了点小差，请稍后重试')
    }
    Promise.reject(new Error({ code: -1, message: error }))
  }
)

const fetch = (method, url, headers, params) => {
  const key = method === 'get' ? 'params' : 'data'
  // eslint-disable-next-line max-len
  const data =
    headers['Content-Type'] === 'application/x-www-form-urlencoded'
      ? Qs.stringify(params)
      : params
  return service({
    url,
    method,
    headers,
    [key]: data
  })
}

const processParams = params => params || {}
fetch.get = url => compose(p => fetch('get', url, {}, p), processParams)
fetch.post = url => compose(p => fetch('post', url, {}, p), processParams)
fetch.form = url =>
  compose(
    p =>
      fetch(
        'post',
        url,
        { 'Content-Type': 'application/x-www-form-urlencoded' },
        p
      ),
    processParams
  )

export default fetch
