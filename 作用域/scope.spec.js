import { after } from "./scope.js";
import { describe, test, expect, beforeEach } from "@jest/globals";

beforeEach(() => {
  function sum(a, b) {
    return a + b;
  }
});

function sum(a, b) {
  return a + b;
}

describe("after 函数", () => {
  test("n 为 数字0", () => {
    const fn = after(0, sum);

    expect(fn(1, 1)).toBeUndefined();
  });

  test("n 为 数字1", () => {
    const fn = after(1, sum);

    fn(1, 1);
    expect(fn(2, 2)).toBe(2);
  });

  test("n 为 字符串0", () => {
    const fn = after(0, sum);

    expect(fn(1, 1)).toBeUndefined();
  });

  test("n 为 字符串1", () => {
    const fn = after(1, sum);

    fn(1, 1);
    expect(fn(2, 2)).toBe(2);
  });

  test("n 为3", () => {
    const fn = after(3, sum);

    fn(1, 1);
    fn(2, 2);
    fn(3, 3);
    expect(fn(4, 4)).toBe(6);
  });

  test("func不是一个函数,抛出错误", () => {
    expect(() => {
      const fn = after(1, {});
    }).toThrow();
  });
});
