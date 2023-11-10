var foo = {
  value: 1,

}

function func() {
  // this.value
  console.log("🚀 ~ file: call.js:8 ~ this.value:", this.value)

}

// func.call(foo)



Function.prototype.call2 = function(context) {
  context.fn = this
  context.fn()
  delete context.fn
}

func.call2(foo)
// foo
console.log("🚀 ~ file: call.js:24 ~ foo:", foo)

