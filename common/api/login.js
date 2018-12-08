/**
 * 登录相关处理
 */

import api from '../../common/api/index'

let isLoginStatus = false

function login(value) {
  return new Promise(resolve => {
    wx.login({
      success: ({ code }) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        getUserInfo().then(({ userInfo }) => {
          console.log(userInfo, 'userinfo')
            Object.assign(value, {code});
            api.sport.login(value).then(({data}) => {
              // 登录成功，设置userInfo和token至Storage
              wx.setStorageSync('token', data.token)
              wx.setStorageSync('userInfo', userInfo)
              isLoginStatus = true
              resolve()
            })
          })
      }
    })
  })
}

// 获取微信用户信息
function getUserInfo() {
  return new Promise(resolve => {
    wx.getUserInfo({
      success: res => {
        resolve(res)
      }
    })
  })
}

// 判断是否登录
function isLogin() {
  return isLoginStatus
}

export {
  login,
  isLogin,
}

export default {
  login,
  isLogin
}