import React from 'react'
import ReactDOM from 'react-dom'
import TestRenderer from 'react-test-renderer'
import WithLogging from './WithLogging'
import Login from '../Login/Login'

describe('WithLogging HOC', () => {
  let consoleSpy

  // Before each test, spy on the console.log method
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  // After each test, restore the console.log method to its original state
  afterEach(() => {
    consoleSpy.mockRestore()
  })

  // Test 1: Ensure console.log is called with "Component" for pure HTML elements
  it('logs "Component" on mount and unmount for pure HTML elements', () => {
    const WrappedComponent = WithLogging(() => <p>Hello World</p>)

    // Render the component
    const div = document.createElement('div')
    ReactDOM.render(<WrappedComponent />, div)
    expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted')

    // Unmount the component
    ReactDOM.unmountComponentAtNode(div)
    expect(consoleSpy).toHaveBeenCalledWith(
      'Component Component is going to unmount'
    )
  })

  // Test 2: Ensure console.log is called with the component name for the Login component
  it('logs "Component Login is mounted" and "Component Login is going to unmount" when wrapping the Login component', () => {
    const WrappedLogin = WithLogging(Login)

    // Render the component using TestRenderer to avoid needing a real DOM
    const testInstance = TestRenderer.create(<WrappedLogin />)
    expect(consoleSpy).toHaveBeenCalledWith('Component Login is mounted')

    // Unmount the component
    testInstance.unmount()
    expect(consoleSpy).toHaveBeenCalledWith(
      'Component Login is going to unmount'
    )
  })
})
