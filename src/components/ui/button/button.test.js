import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button component snapshot tests', () => {

  test('Button render with text', () => {
    const btn = renderer.create(<Button text='Text' />).toJSON()
    expect(btn).toMatchSnapshot()
  })

  test('Button render without text', () => {
    const btn = renderer.create(<Button />).toJSON()
    expect(btn).toMatchSnapshot()
  })

  test('Button render disabled', () => {
    const btn = renderer.create(<Button disabled />).toJSON()
    expect(btn).toMatchSnapshot()
  })

  test('Button render with loader', () => {
    const btn = renderer.create(<Button isLoader />).toJSON()
    expect(btn).toMatchSnapshot()
  })

})

describe('Button component logic', () => {

  test('Button with a callback on click', () => {
    window.alert = jest.fn()
    render(<Button text='text' onClick={alert('test-text')} />)
    const btn = screen.getByText('text')
    fireEvent.click(btn)
    expect(window.alert).toHaveBeenCalledWith('test-text')
  })

})