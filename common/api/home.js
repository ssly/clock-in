import { ajax } from '../js/ajax'

function clockIn() {
  return ajax('POST', '/api/clock/in', undefined, { toast: false }).then(({ data }) => {
    return data || null
  })
}

function getClockInfo() {
  return ajax('GET', '/api/clock/info').then(({ data }) => {
    return {
      count: data.count || 0,
      continuousCount: data.continuousCount || 0, 
      maxContinuousCount: data.maxContinuousCount || 0,
    }
  })
}

export {
  clockIn,
  getClockInfo,
}