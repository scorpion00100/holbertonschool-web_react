import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';

describe('CourseListRow Component', () => {
  it('renders one cell with colspan = 2 when isHeader is true and textSecondCell does not exist', () => {
    const wrapper = shallow(
      <CourseListRow isHeader={true} textFirstCell="Header 1" />
    );
    const th = wrapper.find('th');
    expect(th).toHaveLength(1);
    expect(th.prop('colSpan')).toEqual('2');
    expect(th.text()).toEqual('Header 1');
  });

  it('renders two cells when isHeader is true and textSecondCell is present', () => {
    const wrapper = shallow(
      <CourseListRow
        isHeader={true}
        textFirstCell="Header 1"
        textSecondCell="Header 2"
      />
    );
    const th = wrapper.find('th');
    expect(th).toHaveLength(2);
    expect(th.at(0).text()).toEqual('Header 1');
    expect(th.at(1).text()).toEqual('Header 2');
  });

  it('renders correctly two td elements within a tr element when isHeader is false', () => {
    const wrapper = shallow(
      <CourseListRow
        isHeader={false}
        textFirstCell="Cell 1"
        textSecondCell="Cell 2"
      />
    );
    const td = wrapper.find('td');
    expect(td).toHaveLength(2);
    expect(td.at(0).text()).toEqual('Cell 1');
    expect(td.at(1).text()).toEqual('Cell 2');
  });

  it('renders a header row with correct background color', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Header" />);
    const tr = wrapper.find('tr');
    expect(tr.prop('style')).toHaveProperty('backgroundColor', '#deb5b545');
  });

  it('renders a regular row with correct background color', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="Cell 1" textSecondCell="Cell 2" />);
    const tr = wrapper.find('tr');
    expect(tr.prop('style')).toHaveProperty('backgroundColor', '#f5f5f5ab');
  });
})
