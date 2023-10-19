import { before, after, curry, curryRight, flip } from "../scope.js";
import { describe, test, expect, beforeEach } from "@jest/globals";


function sum(a, b) {
  return a + b;
}

describe("before 函数", () => {
  test("n 为 数字0", () => {
    const fn = before(0, sum);

    expect(fn(1, 1)).toBeUndefined();
  });

  test("n 为 数字1", () => {
    const fn = before(1, sum);

    fn(1, 1);
    expect(fn(2, 2)).toBe(2);
  });

  test("n 为 字符串0", () => {
    const fn = before(0, sum);

    expect(fn(1, 1)).toBeUndefined();
  });

  test("n 为 字符串1", () => {
    const fn = before(1, sum);

    fn(1, 1);
    expect(fn(2, 2)).toBe(2);
  });

  test("n 为3", () => {
    const fn = before(3, sum);

    fn(1, 1);
    fn(2, 2);
    fn(3, 3);
    expect(fn(4, 4)).toBe(6);
  });

  test("func不是一个函数,抛出错误", () => {
    expect(() => {
      const fn = before(1, {});
    }).toThrow();
  });
});

describe('after 函数', () => {
  test('n 为字符串0', () => {
    const fn = after('0', sum)

    expect(fn(1, 1)).toBe(2)
  })

  test('n 数字0', () => {
    const fn = after(0, sum)

    expect(fn(1, 1)).toBe(2)
  })

  test('n 为字符串1', () => {
    const fn = after('1', sum)

    expect(fn(1, 1)).toBeUndefined()
    expect(fn(2, 2)).toBe(4)
  })

  test('n 为数字1', () => {
    const fn = after(1, sum)

    expect(fn(1, 1)).toBeUndefined()
    expect(fn(2, 2)).toBe(4)
  })

  test('n 字符串3', () => {
    const fn = after('3', sum)

    expect(fn(1, 1)).toBeUndefined()
    expect(fn(2, 2)).toBeUndefined()
    expect(fn(3, 3)).toBeUndefined
    expect(fn(4, 4)).toBe(8)
  })

  test('n 数字3', () => {
    const fn = after(3, sum)

    expect(fn(1, 1)).toBeUndefined()
    expect(fn(2, 2)).toBeUndefined()
    expect(fn(3, 3)).toBeUndefined()
    expect(fn(4, 4)).toBe(8)
  })

  test('func 不为函数', () => {
    expect(() => {
      const fn = after(3, {})

    }).toThrowError()

  })



});

describe('curry 函数', () => {
  function testFn(a, b, c) {
    const maybeNaN = (value) => isNaN(value) ? 0 : value

    return maybeNaN(a) + maybeNaN(b) + maybeNaN(c)
  }

  test('每次传入单个参数', () => {
    const fn = curry(testFn)
    fn(1)
    fn(2)
    expect(fn(3)).toBe(6)
  })

  test('一次性传入所有参数', () => {
    const fn = curry(testFn)
    expect(fn(1, 2, 3)).toBe(6)
  })

  test('先传入一个参数，再传入两个', () => {
    const fn = curry(testFn)
    fn(1)
    expect(fn(2, 3)).toBe(6)
  })

  test('先传入两个个参数，再传入一个', () => {
    const fn = curry(testFn)
    fn(1, 2)
    expect(fn(3)).toBe(6)
  })

  test('指定传入一个参数', () => {
    const fn = curry(testFn, 1)
    expect(fn(1)).toBe(1)
  })

  test('指定传入一个参数,传入两个参数', () => {
    const fn = curry(testFn, 1)
    expect(fn(1, 2)).toBe(1)
  })

  test('指定传入两个个参数', () => { })
  const fn = curry(testFn, 2)
  fn(1)
  expect(fn(2)).toBe(3)
})

describe('curryRight 函数', () => {
  function testFn(a, b, c, d) {
    return [].slice.call(arguments)
  }

  test('传入两个参数', () => {
    const fn = curryRight(testFn, 2)
    const expected = [2, 1]

    expect(fn(1)(2)).toEqual(expected)
  })

  test('传入三个个参数', () => {
    const fn = curryRight(testFn, 3)
    const expected = [3, 2, 1]

    expect(fn(1)(2)(3)).toEqual(expected)
  })

  test('先传入一个，再传入两个', () => {
    const fn = curryRight(testFn, 3)
    const expected = [2, 3, 1]

    expect(fn(1)(2, 3)).toEqual(expected)
  })

  test('先传入两个，再传入一个', () => {
    const fn = curryRight(testFn, 3)
    const expected = [3, 1, 2]

    expect(fn(1, 2)(3)).toEqual(expected)
  })

  test('先传入两个，再传入一个', () => {
    const fn = curryRight(testFn, 3)
    const expected = [3, 1, 2]

    expect(fn(1, 2)(3)).toEqual(expected)
  })
});

describe('flip 函数', () => { 
  function testFn(a,b,c) {
    return [a,b,c]
  }

  test('依次传入123', ()=> {
    const expected = [3,2,1]
    const fn = flip(testFn)
    expect(fn(1,2,3)).toEqual(expected)
  })

  test('传入非函数时应该出错', ()=> {
    expect(()=> {
      flip([])
    }).toThrowError()
  })
})