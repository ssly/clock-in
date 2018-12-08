function ajax (method, url, data) {
  console.log('ajax: method, url, data is', method, url, data)
  return new Promise(resolve => {
    wx.request({
      url,
      success: function (res) {
        resolve(res.data)
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