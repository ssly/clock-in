import api from '../../common/api/index'

const getUserGender = function(value) {
  return value === 1 ? "男" : "女";
}

Page({
    data: {
        userInfo: {},
        userGender: "",
        isLogin: false,
    },
    onReady: function() {
        console.log("[my] onReady");
    },
    getUserInfo(res) {
        console.log("[my] getUserInfo", res);
        if (res.detail.errMsg.indexOf("ok") !== -1) {
            let postObj = {
                encryptedData: res.detail.encryptedData,
                iv: res.detail.iv,
                rawData: res.detail.rawData,
            };
            // 调登录接口
            api.login.login(postObj)

            this.setData({
                isLogin: true,
                userInfo: res.detail.userInfo,
                userGender: getUserGender(res.detail.userInfo.gender),
            })
        } else {
            this.setData({
                isLogin: false,
            })
        }
    },
    onShow: function() {
        console.log("[my] onShow");
        let token = wx.getStorageSync('token') || '';
        let userInfo = wx.getStorageSync('userInfo') || '';
        if (token) {
            this.setData({
                isLogin: true,
                userInfo,
                userGender: getUserGender(userInfo.gender),
            })
        } else {
          this.setData({
            isLogin: false,
          })
        }
    }
})