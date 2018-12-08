function ajax (method, url, data) {
  // console.log('[ajax] method, url, data is', method, url, data);
  let token = wx.getStorageSync('token') || '';
  return new Promise(resolve => {
    wx.request({
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        Cookie: `S-Access-Token=${token}`,
      },
      url,
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