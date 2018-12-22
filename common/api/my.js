import { ajax } from '../js/ajax'

function setValidTime(args) {
  console.log(args)
  return ajax('POST', '/api/clock/set-valid-time', args).then(({ code, data, message }) => {
    if (code !== '0') {
      wx.showToast({
        icon: 'none',
        title: message,
        duration: 3000,
      })
      return null
    }

    return data
  })
}

function getValidTime() {
  return ajax('GET', '/api/clock/get-valid-time').then(({ code, data }) => {
    if (code === '0') {
      return data
    }
  })
}

export {
  setValidTime,
  getValidTime,
}