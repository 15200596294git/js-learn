import { isDef } from '../passByValue'
import { describe, test, expect } from '@jest/globals'

describe('isDef函数', ()=> {
  test('null', ()=> {
    expect(isDef(null)).toBeFalsy()
  })

  test('undefined', ()=> {
    expect(isDef(undefined)).toBeFalsy()
  })

  test('字符串null', ()=> {
    expect(isDef('null')).toBeTruthy()
  })

  test('字符串undefined', ()=> {
    expect(isDef('undefined')).toBeTruthy()
  })

  test('空字符串', ()=> {
    expect(isDef('')).toBeTruthy()
  })

  test('字符串aaa', ()=> {
    expect(isDef('aaa')).toBeTruthy()
  })

  test('0', ()=> {
    expect(isDef(0)).toBeTruthy()
  })

  test('字符串0', ()=> {
    expect(isDef('0')).toBeTruthy()
  })

  test('true', ()=> {
    expect(isDef(true)).toBeTruthy()
  })

  test('false', ()=> {
    expect(isDef(false)).toBeTruthy()
  })

  test('数组', ()=> {
    expect(isDef([])).toBeTruthy()
  })

  test('对象', ()=> {
    expect(isDef({})).toBeTruthy()
  })
  


})