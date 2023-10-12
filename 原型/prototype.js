// __proto__指向该实例的原型
console.log(Object.prototype.__proto__)

// 定义一个类`
// class Person {
//     constructor() {
//         return {}
//     }
// }

//  
function Person (){}

const person = new Person()
// person 是Person类的实例
// person作为实例可以通过 __proto__指向原型
// 而Person类可以通过Prototype指向原型
console.log( 'person Person',person.__proto__ === Person.prototype)

// 如果Person是通过class定义，那么上述不相等
// 如果是通过函数定义，那么上述相等
// 通过类定义的 person.__proto__除了constructor属性之外
// 还多出了很多其他属性，可能是由于Class的特性

// constructor属性
// 在Person的原型上有一个constructor，叫做构造函数
// 这个属性会指向Person函数自己
// 所以,
console.log('Person.prototype.constructor', Person.prototype.constructor === person.__proto__.constructor)
