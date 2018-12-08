// home: index.js
// 引入接口
import api from '../../common/api/index';

const logoUrl = "../../common/images/sport.jpg";
import { isLogin } from "../../common/api/login"

Page({
  data: {
    fulfilled: false, // 是否拉去数据成功
    isPunch: false, // 判断今日是否打卡
    logoUrl,
  },
  // 运动打卡
  dayPunch () {
    // 判断用户是否登录
    if (!isLogin()) {
      wx.showModal({
        title: "请登录后再试",
        content: "是否跳转到登录页面进行登录？",
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            console.log("[home] 用户点击确认");
            wx.switchTab({
              url: '/pages/my/index'
            })
          } else {
            console.log("[home] 用户点击取消");
          }
        }
      })
      return
    }
    
    console.log('[home] dayPunch');
    //调用打卡接口，不传参数，默认为今天打卡
    api.sport.punch().then(res => {
      this.setData({
        isPunch: res.data.isPunch
      })
    });
  },
  onShow: function () {
    const _this = this
    console.log('onload')
    // 判断用户是否授权
    wx.getUserInfo({
      success(res) {
        console.log("[home] getUserInfo success", res);
        let postObj = {
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData
        };
        wx.setStorageSync('userInfo', res.userInfo);
        api.login.login(postObj).then(() => {
          // 登录成功后，去调用当天打卡数据
          _this.updateSportList().then(isPunch => {
            _this.setData({
              fulfilled: true,
              isPunch: isPunch
            })
          })
        })
      },
      fail(res) {
        console.log("[home] getUserInfo fail", res);
        _this.setData({
          fulfilled: true,
          isPunch: false,
        })        

      }
    })
  },
  updateSportList() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()

    return api.sport.getList({ year, month, date }).then(res => {
      if (res.code !== 0) {
        return false
      }
      return res.data.isPunch
    })
  }
})
