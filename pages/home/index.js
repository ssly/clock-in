// home: index.js
// 引入接口
import api from '../../common/api/index';

const logoUrl = "../../common/images/sport.jpg";
import { isLogin, login } from "../../common/api/login"
import { $on } from '../../common/js/event'
import { clockIn, getClockInfo } from '../../common/api/home'

Page({
  data: {
    logined: true, // 是否登录
    fulfilled: false, // 是否拉去数据成功
    isPunch: false, // 判断今日是否打卡
    logoUrl,
    dateTime:'',
    dateDay:''
  },
  // 运动打卡
  dayPunch () {
    console.log('globalData', this.globalData)
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

  // 获取用户信息
  onGotUserInfo({ detail }) {
    wx.showLoading({ title: '登录中...' })
    login(detail).then(isLogin => {
      wx.hideLoading()
      if (isLogin) {
        this.setData({
          logined: isLogin,
        })
      }
    })
    console.log('获取用户信息回调', detail)
  },

  onShow: function () {
    // 订阅登录成功
    $on('logined', () => {
      clockIn().then((data)=>{
        // 打卡成功，获取具体打卡信息
        getClockInfo().then(data => {
          console.log('打卡信息是什么', data)
        })

        if (data){
          _this.formatDate();
          _this.setData({
            dateTime: new Date(data.clockTimestamp).Format("hh:mm:ss"), 
            dateDay: new Date(data.clockTimestamp).Format("yyyy-MM-dd")
          })
          // setTimeout(()=>{
          //   console.log(this.data.dateTime.Format("hh:mm:ss"))
          //   console.log(this.data.dateTime.Format("yyyy-MM-dd"))
          // })
        }
      })
    })
    const _this = this
    console.log('HOME: onShow, isLogin', isLogin());
    this.setData({
      logined: isLogin(),
    })
    // 判断用户是否授权
    // wx.getUserInfo({
    //   success(res) {
    //     console.log("[home] getUserInfo success", res);
    //     let postObj = {
    //       encryptedData: res.encryptedData,
    //       iv: res.iv,
    //       rawData: res.rawData
    //     };
    //     wx.setStorageSync('userInfo', res.userInfo);
    //     api.login.login(postObj).then(() => {
    //       // 登录成功后，去调用当天打卡数据
    //       _this.updateSportList().then(isPunch => {
    //         _this.setData({
    //           fulfilled: true,
    //           isPunch: isPunch
    //         })
    //       })
    //     })
    //   },
    //   fail(res) {
    //     console.log("[home] getUserInfo fail", res);
    //     _this.setData({
    //       fulfilled: true,
    //       isPunch: false,
    //     })        

    //   }
    // })
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
  }
})
