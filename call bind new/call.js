var foo = {
  value: 1,

}

function func(a,b) {
  console.log("🚀 ~ file: call.js:7 ~ a:", a)

  console.log("🚀 ~ file: call.js:9 ~ b:", b)

  // this.value
  // console.log("🚀 ~ file: call.js:8 ~ this.value:", this.value)

}

// func.call(foo)
 

// 第一步
Function.prototype.call2 = function(context) {
  context.fn = this
  context.fn()
  delete context.fn
}

func.call2(foo)
// foo
// console.log("🚀 ~ file: call.js:24 ~ foo:", foo)

// 第二步
Function.prototype.call2 = function(context, ...args) {
  context.fn = this || window
  const result = context.fn(...args)
  delete context.fn

  return result
}

func.call2(foo, 1, 2)

