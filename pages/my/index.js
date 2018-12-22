import api from '../../common/api/index'
import { on } from '../../common/js/event'
import { isLogin } from "../../common/api/login"
import { setValidTime, getValidTime } from "../../common/api/my.js"

Page({
    data: {
      logined: isLogin(),
      clockTimeStr: '',
      startTime: '',
      endTime: '',
      loading: false
    },
    onShow: function() {
      // const app = getApp()
      // console.log('my, onshow', app.globalData)
      // on('logined', () => {
      //   this.setData({ logined: true })
      // })
      getValidTime().then(data => {
        const { startTime, endTime } = data;
        this.setData({
          startTime,
          endTime
        })
        console.log(data)
      })
    },
  bindstartTime: function(val) {
    const startTime = val.detail.value;
    this.setData({
      startTime
    });
    console.log(val);

  },
  bindendTime: function (val) {
    const endTime = val.detail.value;
    this.setData({
      endTime
    });
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