const object = {}
const stacks = [] // 调用历史

function $on (key, fn) {
  if (!Array.isArray(object[key])) {
    object[key] = []
  }
  object[key].push(fn)

  // 判断调用栈是否存在内容，是的话重新执行一遍（有BUG，应该只执行后加载的）
  const newStacks = Array.from(new Set(stacks))
  console.log('出事stack', newStacks)
  for (let i = 0; i < newStacks.length; i++) {
    if (key === newStacks[i].key) {
      stacks.splice(i, 1)
      $emit(key, true)
    }
  }

  console.log('最后stack', stacks)
}

function $emit (key, noStack) {
  if (!noStack) {
    stacks.push({ key })
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

export default {
  $on,
  $emit,
}