// pages/login/login.js
// 导入封装通用模块方法
import { toast } from '../../utils/extendApi'
// 导入接口 API 函数
import { reqLogin } from '../../api/user'
// 导入本地存储 api
import { setStorage } from '../../utils/storage'
Page({
  login() {
    wx.login({
      success: async ({ code }) => {
        if (code) {
          // 在获取到临时登录凭证 code 以后,需要传递给开发者服务器
          const res = await reqLogin(code)
          console.log(res)
          const { token } = res.data
          const ress = setStorage('token', token)
          console.log(ress)
        } else {
          toast({ title: '授权失败,请重新登录' })
        }
      }
    })

    // wx.login({
    //   // success: (res) => {
    //   // 直接把code从res里面解构出来
    //   success: ({ code }) => {
    //     // console.log(res)
    //     if (code) {
    //       // 在获取到临时登录凭证 code 以后,需要传递给开发者服务器
    //       console.log(code)
    //     } else {
    //       toast({ title: '授权失败,请重新登录' })
    //     }
    //   }
    // })
  }
})
