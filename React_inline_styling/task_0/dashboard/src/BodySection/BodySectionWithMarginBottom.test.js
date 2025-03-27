import React from 'react'
import { shallow } from 'enzyme'
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom'
import BodySection from './BodySection'

describe('BodySectionWithMarginBottom Component', () => {
  it('should render correctly and pass props to BodySection', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    )

    // Check that it contains a BodySection component
    expect(wrapper.find(BodySection).length).toBe(1)

    // Check that the BodySection component has the correct title prop
    expect(wrapper.find(BodySection).prop('title')).toBe('test title')

    // Check that the BodySection component renders the children correctly
    expect(wrapper.find(BodySection).dive().find('p').text()).toBe(
      'test children node'
    )

    // Check that the div has the correct class
    expect(wrapper.find('div.bodySectionWithMargin').length).toBe(1)
  })
})
