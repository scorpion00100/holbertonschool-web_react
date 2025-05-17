import { fromJS } from 'immutable';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

// Initial state as an Immutable.js Map
const initialState = fromJS({
  courses: []
});

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS: {
      // Normalize and convert the data to Immutable.js Map
      const normalizedData = fromJS(coursesNormalizer(action.data.map(course => ({
        ...course,
        isSelected: false
      }))));

      return state.merge({ courses: normalizedData.get('entities').get('courses') });
    }

    case SELECT_COURSE: {
      return state.setIn(['courses', String(action.index), 'isSelected'], true);
    }

    case UNSELECT_COURSE: {
      return state.setIn(['courses', String(action.index), 'isSelected'], false);
    }

    default:
      return state;
  }
};

export default courseReducer;
