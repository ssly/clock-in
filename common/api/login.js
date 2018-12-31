/**
 * 登录相关处理
 */

import sport from './sport.js'

// 登录，根据登录信息取 openid，但不获需要授权取用户信息
function login() {
  return getWxCode().then(code => {
    return sport.login({ code }).then(({ token, userInfo }) => {
      wx.setStorageSync('token', token)
      return userInfo
    })
  })
}

// 授权用户信息
function setUserInfo(data) {
  return sport.updateUserInfo(data)
}

// function login(userInfo) {
//   return new Promise(resolve => {
//     if (typeof userInfo !== 'object') {
//       resolve(false)
//       return
//     }
//     getWxCode().then(code => {
//       console.log('login中的code', code);
//       const data = { ..., code }
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
    wx.login({
      success: ({ code }) => {
        resolve(code)
      }
    })
  })
}

export {
  login,
  setUserInfo,
}