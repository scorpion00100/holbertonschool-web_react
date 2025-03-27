import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('CourseList Component', () => {
  it('renders CourseList component without crashing', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.exists()).toBe(true);
  });

  describe('With an empty CourseList or no listCourses prop', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<CourseList />);
    });

    it('renders the correct header and "No course available yet" row', () => {
      const rows = wrapper.find(CourseListRow);
      expect(rows).toHaveLength(3);
      expect(rows.at(0).prop('textFirstCell')).toEqual('Available courses');
      expect(rows.at(1).prop('textFirstCell')).toEqual('Course name');
      expect(rows.at(1).prop('textSecondCell')).toEqual('Credit');
      expect(rows.at(2).prop('textFirstCell')).toEqual(
        'No course available yet'
      );
    });
  });

  describe('With CourseList containing elements', () => {
    let wrapper;
    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ];

    beforeEach(() => {
      wrapper = shallow(<CourseList listCourses={listCourses} />);
    });

    it('renders the correct number of rows and data', () => {
      const rows = wrapper.find(CourseListRow);
      expect(rows).toHaveLength(5);

      expect(rows.at(0).prop('textFirstCell')).toEqual('Available courses');
      expect(rows.at(1).prop('textFirstCell')).toEqual('Course name');
      expect(rows.at(1).prop('textSecondCell')).toEqual('Credit');

      expect(rows.at(2).prop('textFirstCell')).toEqual('ES6');
      expect(rows.at(2).prop('textSecondCell')).toEqual(60);

      expect(rows.at(3).prop('textFirstCell')).toEqual('Webpack');
      expect(rows.at(3).prop('textSecondCell')).toEqual(20);

      expect(rows.at(4).prop('textFirstCell')).toEqual('React');
      expect(rows.at(4).prop('textSecondCell')).toEqual(40);
    });
  });
});
