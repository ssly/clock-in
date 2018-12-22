import { ajax } from '../js/ajax'

function clockIn() {
  return ajax('POST', '/api/clock/in').then(({ code, data, message }) => {
    if (code === '404') {
      // 没有设置打卡范围，引导去我的页面进行设置
      wx.showModal({
        title: '未设置打卡范围',
        content: '请去我的页面设置打卡范围',
        success({ confirm }) {
          if (confirm) {
            wx.switchTab({
              url: '/pages/my/index',
            })
          }
        }
      })
      return {}
    }
    if (code !== '0') {
      wx.showToast({
        icon: 'none',
        title: message,
        duration: 3000,
      })
      return {}
    }

    return data
  })
}

function getClockInfo() {
  return ajax('GET', '/api/clock/info').then(({ code, data }) => {
    return data
  })
}

export {
  clockIn,
  getClockInfo,
}