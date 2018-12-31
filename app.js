import { login, updateUserInfo } from "./common/api/login"
import { $emit } from './common/js/event'

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    login().then(userInfo => {
      // 发送成功登陆的消息
      $emit('logined')
      console.log('userInfo', userInfo);
      if (userInfo) {
        this.globalData.userInfo = userInfo
      }
      // 获取用户信息
      // wx.getSetting({
      //   success: res => {
      //     if (res.authSetting['scope.userInfo']) {
      //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      //       wx.getUserInfo({
      //         success: res => {
      //           this.globalData.userInfo = res.userInfo
      //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //           // 所以此处加入 callback 以防止这种情况
      //           if (this.userInfoReadyCallback) {
      //             this.userInfoReadyCallback(res)
      //           }
      //         }
      //       })
      //     }
      //   }
      // })
    });

  },

  globalData: {
    userInfo: null
  }
})