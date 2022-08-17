import { selectionSort } from "./selection-sort";
import { bubbleSort } from "./bubbel-sort";

describe('SelectionSort tests', () => {

  test('SelectionSort with an empty array', async () => {
    const sort = await selectionSort('asc', [])
    expect(sort).toEqual([])
  })

  test('SelectionSort with a single item array', async () => {
    const sort = await selectionSort('asc', [1])
    expect(sort).toEqual([1])
  })

  test('SelectionSort with a ascending and populated array', async () => {
    const sort = await selectionSort('asc', [3, 1, 2])
    expect(sort).toEqual([1, 2, 3])
  })

  test('SelectionSort with a descending and populated array', async () => {
    const sort = await selectionSort('desc', [3, 1, 2])
    expect(sort).toEqual([3, 2, 1])
  })

})

describe('BubbleSort tests', () => {

  test('BubbleSort with an empty array', async () => {
    const sort = await bubbleSort('asc', [])
    expect(sort).toEqual([])
  })

  test('BubbleSort with a single item array', async () => {
    const sort = await bubbleSort('asc', [1])
    expect(sort).toEqual([1])
  })

  test('BubbleSort with a ascending and populated array', async () => {
    const sort = await bubbleSort('asc', [3, 1, 2])
    expect(sort).toEqual([1, 2, 3])
  })

  test('BubbleSort with a descending and populated array', async () => {
    const sort = await bubbleSort('desc', [3, 1, 2])
    expect(sort).toEqual([3, 2, 1])
  })

})