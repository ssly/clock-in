import { ajax } from '../js/ajax'

function getList (data) {
  return ajax('GET', '/api/sport/get-record', data).then(res => {
    return res
  })
}

function punch(data) {
  return ajax('POST', '/api/sport/update-record', data).then(res => {
    return res
  })
}

function login(data) {
  return ajax('POST', '/api/login', data).then(({ data }) => {
    return data
  })
}

function updateUserInfo(data) {
  return ajax('POST', '/api/login/userinfo', data).then(res => {
    return res
  })
}

export default {
  getList,
  punch,
  login,
  updateUserInfo,
}