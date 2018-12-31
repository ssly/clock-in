import api from '../../common/api/index'
import { on } from '../../common/js/event'
import { setUserInfo } from "../../common/api/login"
import { setValidTime, getValidTime } from "../../common/api/my.js"

const app = getApp()

Page({
  data: {
    clockTimeStr: '',
    startTime: '',
    endTime: '08:00',
    loading: false,
    userInfo: null,
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    setTimeout(() => {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    })
  },
  onShow: function() {
    console.log('my, onshow', app.globalData)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }

    getValidTime().then(data => {
      const { startTime, endTime } = data;
      this.setData({
        startTime,
        endTime: endTime || '08:00',
      })
      console.log(data)
    })
  },
  bindstartTime: function(val) {
    const startTime = val.detail.value;
    this.setData({
      startTime
    });
  },

  // getUserInfo() {
  //   wx.showToast({
  //     icon: 'none',
  //     title: '该功能暂时未开放，敬请期待',
  //     duration: 3000,
  //   })
  // },

  onGotUserInfo({ detail }) {
    if (detail.errMsg === 'getUserInfo:ok') {
      app.globalData.userInfo = detail.userInfo
      this.setData({
        userInfo: app.globalData.userInfo,
      })
      setUserInfo(detail.userInfo)
    }
  },

  saveModify() {
    if (this.data.startTime || this.data.endTime) {
      this.setData({loading: true});
      setValidTime({
        startTime: this.data.startTime,
        endTime: this.data.endTime
      }).then(() => {
        this.setData({loading: false});
      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '请选择合理的打卡时间',
        duration: 3000,
      })
    }
  }
})