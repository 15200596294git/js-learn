
// 思考题 来自 JavaScript权威指南
// var scope = 'global scope'
// function checkscope() {
//   var scope = 'local scope'
//   function f() {
//     return scope
//   }
//   return f()
// }

// checkscope()

// var scope = 'global scope'
// function checkscope() {
//   var scope = 'local scope'
//   function f() {
//     return scope
//   }

//   return f
// }
// checkscope()()

// 执行栈
const ESC = [

  // 'f',
  // 'checkscope',

  'f',
  'checkscope',
  'global',
]

// 变量对象
var global = 'global'
function fun(a, b) {
  console.log(a, b)
}

// 执行fun时
/**
 * {
 *   全局变量
 *   global: 'global',
 * 
 *   函数内容初始的变量对象
 *   Arguments: {
 *     0: 1,
 *     1: 2
 *   },
 *   a: 1,
 *   b: 2,
 * }
 */
fun(1, 2)

/**
 * 第一步
 * global nAdd
 * let a1 = t()
 * n, t2
 * n = 99
 */

// 闭包只单例模式

// 需求：
// 请求用户列表接口，

const requestList = async () => {
  setTimeout(() => {
    return {
      data: [],
      code: 0
    }
  }, 5000);
}

const singleton = (function () {
  let isLoading = false

  return async () => {
    if (isLoading) {
      console.log('接口请求中');
      return
    }

    isLoading = true

    await requestList().finally(() => {
      isLoading = false
    })

  }
  
})()

const a1 = singleton()
const a2 = singleton()
console.log(a1 === a2);
