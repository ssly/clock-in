const listObj = {}

function $on (key, fn) {
  if (!Array.isArray(listObj[key])) {
    listObj[key] = []
  }
  listObj[key].push(fn)
}

function $emit (key) {
  const list = listObj[key]
  if (!Array.isArray(list)) {
    return
  }
  list.forEach(fn => {
    fn()
  })
}

export {
  $on,
  $emit,
}

export default {
  $on,
  $emit,
}