import api from '../../common/api/index'
import { on } from '../../common/js/event'
import { isLogin } from "../../common/api/login"

Page({
    data: {
      logined: isLogin(),
      clockTimeStr: '',
    },
    onShow: function() {
      const app = getApp()
      console.log('my, onshow', app.globalData)
      on('logined', () => {
        this.setData({ logined: true })
      })
      console.log('登录了吗', isLogin())
      console.log(this.data.logined)
      if (this.data.logined) {
      }
    }
})