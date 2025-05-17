import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';
import { bindActionCreators } from 'redux';

// Action creator for selecting a course
export function selectCourse(index) {
  return {
    type: SELECT_COURSE,
    index,
  };
}

// Action creator for unselecting a course
export function unSelectCourse(index) {
  return {
    type: UNSELECT_COURSE,
    index,
  };
}

// Fonction qui lie les créateurs d'actions au dispatch
export function boundCourseActions(dispatch) {
  return bindActionCreators(
    {
      selectCourse,
      unSelectCourse
    },
    dispatch
  );
}
