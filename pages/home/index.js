// home: index.js
// 引入接口
import api from '../../common/api/index';

const logoUrl = "../../common/images/sport.jpg";
import { login } from "../../common/api/login"
import { $on } from '../../common/js/event'
import { clockIn, getClockInfo } from '../../common/api/home'

Page({
  data: {
    fulfilled: false, // 是否拉去数据成功
    isPunch: false, // 判断今日是否打卡
    logoUrl,
    dateTime:'',
    dateDay:'',
    count: 0, // 完成天数
    continuousCount: 0, // 连续完成天数
    maxContinuousCount: 0, // 最高连续完成天数
  },

  onPullDownRefresh () {
    wx.showNavigationBarLoading()
    this.updateClockInfo().then(() => {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    })
  },

  onShow: function () {
    // 订阅登录成功
    $on('logined', () => {
      this.updateClockInfo()
    })
  },

  onLoad: function () {

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
  },

  formatDate(){
    //格式化日期
    Date.prototype.Format = function (fmt) {
      var o = {
        "y+": this.getFullYear(),
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S+": this.getMilliseconds()             //毫秒
      };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          if (k == "y+") {
            fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
          }
          else if (k == "S+") {
            var lens = RegExp.$1.length;
            lens = lens == 1 ? 3 : lens;
            fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
          }
          else {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
      }
      return fmt;
    }
  },

  // 更新打卡信息
  updateClockInfo () {
    return clockIn().then((data) => {
      if (data) {
        this.formatDate()
        this.setData({
          dateTime: new Date(data.clockTimestamp).Format("hh:mm:ss"),
          dateDay: new Date(data.clockTimestamp).Format("yyyy-MM-dd")
        })
      }

      // 打卡成功，获取具体打卡信息
      return getClockInfo().then(data => {
        const { count, continuousCount, maxContinuousCount } = data
        this.setData({ count, continuousCount, maxContinuousCount })
      })
    })
  }
})
