const HOST = 'http://localhost:4321'
// const HOST = 'https://lius.me'

function ajax (method, url, data, options = {}) {
  const toast = typeof options.toast === 'undefined' ? true : options.toast
  // console.log('[ajax] method, url, data is', method, url, data);
  let token = wx.getStorageSync('token') || '';
  return new Promise(resolve => {
    wx.request({
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        Cookie: `Clock-Access-Token=${token}`,
      },
      url: `${HOST}${url}`,
      success ({ data }) {
        switch (data.code) {
          case '0':
            break
          case '404':
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
            break
          default:
            if (toast) {
              wx.showToast({
                icon: 'none',
                title: data.message,
                duration: 3000,
              })
            }
        }
        resolve(data)
      },
      fail: function(error) {
        resolve(null)
      }
    })
  })
}

export {
  ajax
}
export default {
  ajax
}