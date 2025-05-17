import { fromJS } from 'immutable';
import courseReducer from './courseReducer';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';

// Test data for courses
const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('courseReducer', () => {
  it('should return the default state (empty array) when no action is passed', () => {
    const result = courseReducer(undefined, {}).toJS();
    expect(result).toEqual({ courses: [] });
  });

  it('should handle FETCH_COURSE_SUCCESS and return the correct state', () => {
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: courses,
    };
    const expectedState = fromJS({
      courses: {
        1: { id: 1, name: "ES6", credit: 60, isSelected: false },
        2: { id: 2, name: "Webpack", credit: 20, isSelected: false },
        3: { id: 3, name: "React", credit: 40, isSelected: false },
      }
    });

    const result = courseReducer(undefined, action);
    expect(result).toEqual(expectedState);
  });

  it('should handle SELECT_COURSE and update the isSelected field of the right course', () => {
    const initialState = fromJS({
      courses: [
        { id: 1, name: "ES6", credit: 60, isSelected: false },
        { id: 2, name: "Webpack", credit: 20, isSelected: false },
      ]
    });

    const action = {
      type: SELECT_COURSE,
      index: 1,
    };

    const expectedState = initialState.setIn(['courses', 1, 'isSelected'], true);

    const result = courseReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should handle UNSELECT_COURSE and update the isSelected field of the right course', () => {
    const initialState = fromJS({
      courses: [
        { id: 1, name: "ES6", credit: 60, isSelected: true },
        { id: 2, name: "Webpack", credit: 20, isSelected: false },
      ]
    });

    const action = {
      type: UNSELECT_COURSE,
      index: 0,
    };

    const expectedState = initialState.setIn(['courses', 0, 'isSelected'], false);

    const result = courseReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
