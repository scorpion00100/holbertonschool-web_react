import React from 'react'
import { shallow } from 'enzyme'
import Login from './Login'

describe('Login Component', () => {
  it('should render without crashing', () => {
    shallow(<Login />)
  })

  it('should render 2 input tags and 2 label tags', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper.find('input').length).toBe(2)
    expect(wrapper.find('label').length).toBe(2)
  })
})
