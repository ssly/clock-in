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
  console.log('/api/login, data is', data);
  return ajax('POST', '/api/login', data).then(res => {
    return res
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