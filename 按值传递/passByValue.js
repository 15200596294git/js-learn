// 基本类型
const a = 1
function fn1(a) {
  a = 2
  // console.log('2', a) // 2
}

fn1(a)
// console.log('1', a) // 1

/**
 * 声明变量a =》 开辟栈内存，并存储值为4，与变量a关联
 * 调用fn1(a)
 * 1.将实参a的值拷贝给形参b，由于a是基本类型，相当于在fn1函数内部声明一个变量a，然后开辟一个内存其值为1，这个内存和形参a关联
 * 2.将形参的值修改，这个时候在内存中改变了和形参a关联的内存中的值，并不会影响实参a
 * 3.打印，这时打印了形参a，a为修改后的值 ，也就是2
 * 4.打印实参a，实参a没有被改变，所以还是1
 */

// 引用类型
let arr = [1, 2, 3, 4]
function fn2(arr) {
  arr.push(5)
  // console.log('[1,2,3,4,5]', arr)
}

fn2(arr)
// console.log('[1,2,3,4,5]', arr)
/**
 * 声明变量arr，（由于数组是引用类型，真正的值需要存储在堆内存中），此时在栈内存中用一个值来指向堆内存，然后把栈内存的值给到变量arr
 * 也就是说arr存储的只是一个地址的引用，而不是（原始类型比如数字2，会直接存储2）
 * 调用 fn2(arr)
 * 1.将实参arr传入，将实参arr存储的地址拷贝给形参arr（注意：形参只是拿到了一个引用地址，不是真正的值），此时实参和形参都引用了一个地址，如果改变地址引用的值双方都会受到影响
 * 2.arr.push(5) ，形参通过地址改变了数组的内容，此时实参也受到了影响
 * 3.函数内部打印 1,2,3,4,5
 * 4.全局打印 1,2,3,4,5
 */


arr = [1, 2, 3, 4]
function fn3(arr) {
  arr = [1, 2, 3]
  arr.push(5)
  // console.log('1235', arr)
}

fn3(arr)
// console.log('1234', arr)
/**
 * fn3(arr) 函数调用
 * 1.实参arr存储的地址拷贝给了形参
 * 2.此时对形参重新进行了赋值，本来arr存储了一个地址，此时对它重新赋值，也就是说它将不再引用该地址（然后形参arr存储了新的地址）
 * 3.对新的地址的引用对象修改
 * 4.打印新的引用 1,2,3,5
 * 5.打印全局arr 1,2,3,4
 */

/**
 * 从引用类型到基本类型的转换，也就是拆箱的过程中，会遵循ECMAScript规范规定的toPrimitive原则，一般会调用引用类型的valueOf和toString方法，你也可以直接重写toPeimitive方法。一般转换成不同类型的值遵循的原则不同，例如：
 * 引用类型转换为Number类型，先调用valueOf，再调用toString
 * 引用类型转换为String类型，先调用toString，再调用valueOf
 */

const obj = {
  valueOf: ()=> {
    // console.log('valueOf')
    return 100
    // return {}
  },
  toString: ()=> {
    // console.log('toString');
    return 100
    // return {}
  }
}

// console.log(1 + obj); // valueOf
// console.log(`${obj}`) // toString

/**
 * 注意+是个例外，执行+操作符时：
 * 1.当一侧为String类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型。
 * 2.当一侧为Number类型，另一侧为原始类型，则将原始类型转换为Number类型。
 * 3.当一侧为Number类型，另一侧为引用类型，将引用类型和Number类型转换成字符串后拼接。
 * 
 * 隐式转换
 * '如果其中一个操作数是 null 或者 undefined ，那么另一个操作数必须是 null 或者 undefined 才会返回 true ，否则返回 false 。'
 */
const obj2 = {
  // toString: ()=> {
  //   console.log('toString');
  //   return 'jg'
  // }
  // valueOf: ()=> {
  //   console.log('valueOf')
  //   return 100
  // }
}

// console.log(typeof('1' + obj2) );
const ret = 1 + obj2

console.log(typeof ret, ret);

/**
 * 判断值是否为null或者undefined
 * 因为使用 == 比较时，如果其中一个为null或者undefined，另外一个比较值也必须为null或者undefined时才能返回true，否则返回false
 */
export function isDef(value) {
  return !(value == null)
}

/**
 * == 比较
 * NaN和其他任何类型值永远返回false
 * Boolean和其他类型比较，Boolean首先被转换为Number类型
 * String和Number比较，先将String转换为Number类型
 */

// 数组元素为null或者undefined时，当作空字符串处理
// [null] == false // true

let num = 1
const b = {
  valueOf: ()=>  {
    return num++
  }
}