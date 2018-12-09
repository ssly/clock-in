import { ajax } from '../js/ajax'
const HOST = 'http://192.168.0.116:4321'

function getList (data) {
  return ajax('GET', HOST + '/api/sport/get-record', data).then(res => {
    return res
  })
}

function punch(data) {
  return ajax('POST', HOST + '/api/sport/update-record', data).then(res => {
    return res
  })
}

function login(data) {
  console.log('api/login, data is', data);
  return ajax('POST', HOST + '/api/login', data).then(res => {
    return res
  })
}

export default {
  getList,
  punch,
  login
}