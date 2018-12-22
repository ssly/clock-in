const object = {}
const stacks = [] // 调用历史

function $on(key, fn) {
  if (!Array.isArray(object[key])) {
    object[key] = []
  }
  object[key].push(fn)

  stacks.forEach(stack => {
    if (stack.key === key) {
      fn(); // 补发布这次订阅
    }
  })
}

function $emit(key) {
  if (!stacks.includes(key)) {
    stacks.push({ key });
  }
  const list = object[key]
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