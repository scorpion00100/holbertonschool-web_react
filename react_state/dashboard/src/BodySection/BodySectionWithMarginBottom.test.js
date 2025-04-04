import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';
import { StyleSheetTestUtils, StyleSheet, css } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('BodySectionWithMarginBottom Component', () => {
  it('renders correctly a BodySection component and passes props correctly', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title='test title'>
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    const bodySection = wrapper.find(BodySection);
    expect(bodySection).toHaveLength(1);

    expect(bodySection.props().title).toEqual('test title');

    expect(bodySection.dive().find('p').text()).toEqual('test children node');

    const div = wrapper.find('div');
    const expectedClassName = css(StyleSheet.create({
      bodySectionWithMargin: {
        marginBottom: '40px',
      },
    }).bodySectionWithMargin);
    expect(div.hasClass(expectedClassName)).toBe(true);
  });
});
