import React from 'react'
import { shallow } from 'enzyme'
import Footer from './Footer'
import { getFullYear, getFooterCopy } from '../utils/utils'

jest.mock('../utils/utils', () => ({
  getFullYear: jest.fn(() => 2024),
  getFooterCopy: jest.fn(() => 'Holberton School')
}))

describe('Footer Component', () => {
  it('should render without crashing', () => {
    shallow(<Footer isIndex={true} />)
  })

  it('should render the text "Copyright"', () => {
    const wrapper = shallow(<Footer isIndex={true} />)
    expect(wrapper.text()).toContain('Copyright')
  })
})
