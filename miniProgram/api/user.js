// 导入封装的网络请求模块实例
import http from '../utils/http'
/**
 * @description 进行登录操作
 * @param {*} code 获取到的临时登录凭证
 * @returns Promise
 */
export const reqLogin = (code) => http.get(`/weixin/wxLogin/${code}`)
