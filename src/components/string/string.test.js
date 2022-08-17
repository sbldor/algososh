import { reverseString } from './reverse-string';

describe('ReverseString tests', () => {

  test('Revers with an even number of characters', async () => {
    const testArr = ['1', '2', '3', '4']
    const testRes = ['4', '3', '2', '1']
    const testRevers = await reverseString(testArr)
    expect(testRevers).toEqual(testRes)
  })

  test('Revers with an odd number of characters', async () => {
    const testArr = ['1', '2', '3']
    const testRes = ['3', '2', '1']
    const testRevers = await reverseString(testArr)
    expect(testRevers).toEqual(testRes)
  })

  test('Revers with one character', async () => {
    const testArr = ['1']
    const testRes = ['1']
    const testRevers = await reverseString(testArr)
    expect(testRevers).toEqual(testRes)
  })

  test('Revers with an empty string', async () => {
    const testRevers = await reverseString([])
    expect(testRevers).toEqual([])
  })

})