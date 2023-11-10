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

  "f",
  "checkscope",
  "global",
];

// 变量对象
var global = "global";
function fun(a, b) {
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
fun(1, 2);

/**
 * 第一步
 * global nAdd
 * let a1 = t()
 * n, t2
 * n = 99
 */

// 闭包

/**
 * @description 函数调用n次以及前保持正常调用，n次之后返回最后一次调用
 * @param {number} n
 * @param {Function<void>} func
 * @returns {(...args: any[])=> void}
 */
export function before(n, func) {
  if (typeof func !== 'function') {
    throw new TypeError('after第二个参数必须为一个函数')
  }

  let result;

  return function (...args) {
    if (n > 0) {
      result = func.apply(this, args);
      n--;
    } else {

      if (func) {
        func = null
      }
    }

    return result
  };
}

/**
 * @description after,在调用n以及n次前，不会触发函数调用，n次后开始真正的函数调用
 * @param {number} n
 * @param {Function} func
 * @returns {(...args: any[])=> void}
 */
export function after(n, func) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  return function (...args) {
    if (n <= 0) {
      return func.apply(this, args)
    } else {
      n--
    }

  }
}

/**
 * @description 柯里化
 * @param {Function} func
 * @param {number} [arity = func.length]
 * @returns {Function}
 */
export function curry(func, arity = func.length) {

  let restArgs = []

  function fn(...args) {
    restArgs = restArgs.concat(args)

    if (restArgs.length >= arity) {
      return func.apply(this, restArgs.slice(0, arity))
    }

    return fn
  }

  return fn
}

/**
 * @description 柯里化right
 * @param {Function} func
 * @param {number} [arity = func.length]
 * @returns {Function}
 */
export function curryRight(func, arity = func.length) {

  let restArgs = []

  function fn(...args) {
    restArgs.unshift(...args)

    if (restArgs.length >= arity) {
      return func.apply(this, restArgs.slice(0, arity))
    }

    return fn
  }

  return fn
}

/**
 * @description filp函数，将一个函数的参数进行翻转
 * @param {Function} func
 */
export function flip(func) {
  if(typeof func !== 'function') {
    throw TypeError('预期接收一个函数')
  }

  return function (...args) {
    return func.apply(this, args.reverse())
  }
}