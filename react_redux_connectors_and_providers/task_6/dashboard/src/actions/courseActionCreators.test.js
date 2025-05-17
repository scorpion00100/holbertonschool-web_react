// src/actions/courseActionCreators.test.js
import { selectCourse, unSelectCourse } from './courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

// Test for selectCourse action creator
describe('Action Creators', () => {
  it('selectCourse should create the correct action', () => {
    const expectedAction = {
      type: SELECT_COURSE,
      index: 1,
    };
    expect(selectCourse(1)).toEqual(expectedAction);
  });

  // Test for unSelectCourse action creator
  it('unSelectCourse should create the correct action', () => {
    const expectedAction = {
      type: UNSELECT_COURSE,
      index: 1,
    };
    expect(unSelectCourse(1)).toEqual(expectedAction);
  });
});
