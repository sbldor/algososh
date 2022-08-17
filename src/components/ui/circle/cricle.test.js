import renderer from 'react-test-renderer'
import { Circle } from './circle'
import { ElementStates } from '../../../types/element-states'

describe('Circle component snapshot tests', () => {

  test('Circle without text', () => {
    const cir = renderer.create(<Circle />).toJSON()
    expect(cir).toMatchSnapshot()
  })

  test('Circle with letter', () => {
    const cir = renderer.create(<Circle letter='test' />).toJSON()
    expect(cir).toMatchSnapshot()
  })

  test('Circle with head', () => {
    const cir = renderer.create(<Circle head='test' />).toJSON()
    expect(cir).toMatchSnapshot()
  })

  test('Circle with tail', () => {
    const cir = renderer.create(<Circle tail='test' />).toJSON()
    expect(cir).toMatchSnapshot()
  })

  test('Circle with component in head', () => {
    const cir = renderer.create(<Circle head={<Circle />} />).toJSON()
    expect(cir).toMatchSnapshot()
  })

  test('Circle with component in tail', () => {
    const cir = renderer.create(<Circle tail={<Circle />} />).toJSON()
    expect(cir).toMatchSnapshot()
  })

  test('Circle with index', () => {
    const cir = renderer.create(<Circle index={1} />).toJSON()
    expect(cir).toMatchSnapshot()
  })

  test('Circle with isSmall prop', () => {
    const cir = renderer.create(<Circle isSmall />).toJSON()
    expect(cir).toMatchSnapshot()
  })

  test('Circle with Default state', () => {
    const cir = renderer.create(<Circle state={ElementStates.Default} />).toJSON()
    expect(cir).toMatchSnapshot()
  })

  test('Circle with Changing state', () => {
    const cir = renderer.create(<Circle state={ElementStates.Changing} />).toJSON()
    expect(cir).toMatchSnapshot()
  })

  test('Circle with Default state', () => {
    const cir = renderer.create(<Circle state={ElementStates.Modified} />).toJSON()
    expect(cir).toMatchSnapshot()
  })

})