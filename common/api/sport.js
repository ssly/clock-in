import { ajax } from '../js/ajax'
const HOST = 'https://lius.me'

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
  return ajax('POST', HOST + '/api/sign-in', data).then(res => {
    return res
  })
}

export default {
  getList,
  punch,
  login
}