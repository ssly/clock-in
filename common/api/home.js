import { ajax } from '../js/ajax'
const HOST = 'http://192.168.0.116:4321'

function clockIn() {
  return ajax('POST', HOST + '/api/clock/in').then(res => {
    return res
  })
}
export {
  clockIn
}