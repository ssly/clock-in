// const HOST = 'http://192.168.0.116:4321'
const HOST = 'https://lius.me'

function ajax (method, url, data) {
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
      success: function (res) {
        resolve(res.data)
      },
      fail: function(error) {
        resolve(error)
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