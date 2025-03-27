import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header/Header'
import logo from '../assets/holberton-logo.jpg'
import { StyleSheetTestUtils } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

describe('<Header />', () => {
  it('renders without crashing', () => {
    shallow(<Header />)
  })

  it('renders an <img> tag with correct src and alt attributes', () => {
    const wrapper = shallow(<Header />)
    const img = wrapper.find('img')
    expect(img).toHaveLength(1)
    expect(img.prop('src')).toEqual(logo)
    expect(img.prop('alt')).toEqual('logo')
  })

  it('renders an <h1> tag with correct text', () => {
    const wrapper = shallow(<Header />)
    const h1 = wrapper.find('h1')
    expect(h1).toHaveLength(1)
    expect(h1.text()).toEqual('School dashboard')
  })
})
