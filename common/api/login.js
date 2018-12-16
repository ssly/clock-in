/**
 * 登录相关处理
 */

import sport from './sport.js'

let isLoginStatus = false
let code = ''

// 登录，根据登录信息取 openid，但不获需要授权取用户信息
function login() {
  return getWxCode().then(code => {
    return sport.login({ code }).then(({ code, data }) => {
      if (code === '0') {
        wx.setStorageSync('token', data.token)
      }
    })
  })
}

function updateUserInfo(data) {
  return sport.updateUserInfo(data).then(res => {
    console.log('hahahha', res)
  })
}

// 授权获取用户信息
// function login(userInfo) {
//   return new Promise(resolve => {
//     if (typeof userInfo !== 'object') {
//       resolve(false)
//       return
//     }
//     getWxCode().then(code => {
//       console.log('login中的code', code);
//       const data = { ...userInfo, code }
//       sport.login(data).then(res => {
//         console.log('后台返回了什么', res)
//         isLoginStatus = true
//         resolve(isLoginStatus)
//       })
//     })
//   })
    // wx.login({
    //   success: ({ code }) => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     sport.login({ code }).then(res => {
    //       console.log('返回了什么', res);
    //     })
    //     // getUserInfo().then(({ userInfo }) => {
    //     //   console.log(userInfo, 'userinfo')
    //     //     api.sport.login(value).then(({data}) => {
    //     //       // 登录成功，设置userInfo和token至Storage
    //     //       wx.setStorageSync('token', data.token)
    //     //       wx.setStorageSync('userInfo', userInfo)
    //     //       isLoginStatus = true
    //     //       resolve()
    //     //     })
    //     //   })
    //   }
    // })
// }

// 获取微信 code
function getWxCode () {
  return new Promise(resolve => {
    if (code !== '') {
      resolve(code)
      return
    }
    wx.login({
      success: (res) => {
        code = res.code
        resolve(code)
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
  updateUserInfo,
}