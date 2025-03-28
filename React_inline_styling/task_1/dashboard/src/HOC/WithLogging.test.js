import React from 'react'
import ReactDOM from 'react-dom'
import TestRenderer from 'react-test-renderer'
import WithLogging from './WithLogging'
import Login from '../Login/Login'
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('WithLogging HOC', () => {
  let consoleSpy

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { })
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('logs "Component" on mount and unmount for pure HTML elements', () => {
    const WrappedComponent = WithLogging(() => <p>Hello World</p>)

    const div = document.createElement('div')
    ReactDOM.render(<WrappedComponent />, div)
    expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted')

    ReactDOM.unmountComponentAtNode(div)
    expect(consoleSpy).toHaveBeenCalledWith(
      'Component Component is going to unmount'
    )
  })

  it('logs "Component Login is mounted" and "Component Login is going to unmount" when wrapping the Login component', () => {
    const WrappedLogin = WithLogging(Login)

    const testInstance = TestRenderer.create(<WrappedLogin />)
    expect(consoleSpy).toHaveBeenCalledWith('Component Login is mounted')

    testInstance.unmount()
    expect(consoleSpy).toHaveBeenCalledWith(
      'Component Login is going to unmount'
    )
  })
})
