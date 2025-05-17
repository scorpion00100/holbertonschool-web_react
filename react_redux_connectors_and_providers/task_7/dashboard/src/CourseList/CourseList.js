import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from './CourseListRow'
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getCourses } from '../selectors/courseSelector';

export class CourseList extends React.Component {
  static propTypes = {
    fetchCourses: PropTypes.func,
    selectCourse: PropTypes.func,
    unSelectCourse: PropTypes.func,
    listCourses: PropTypes.instanceOf(List)
  }

  static defaultProps = {
    fetchCourses: () => { },
    selectCourse: () => { },
    unSelectCourse: () => { },
    listCourses: List()
  }

  componentDidMount() {
    const { fetchCourses } = this.props;

    fetchCourses();
  }

  onChangeRow(id, checked) {
    const {selectCourse, unSelectCourse} = this.props;

    if (checked === true) {
      selectCourse(id);
    } else if (checked === false) {
      unSelectCourse(id);
    }
  }

  render() {
    const { listCourses } = this.props;
    
    const courseItems = listCourses.map((course, index) =>

      <CourseListRow
        textFirstCell={course.get('name')}
        textSecondCell={course.get('credit')}
        isHeader={false}
        isChecked={course.get('isSelected')}
        setIsChecked={(checked) => this.onChangeRow(course.get('id'), checked)}
        key={course.get('id') || index}
      />
    );

    return (
      <table className={css(styles.courseList)}>
        <thead>
          <CourseListRow  textFirstCell="Available courses" isHeader={true} />
          <CourseListRow
            textFirstCell="Course name"
            textSecondCell="Credit"
            isHeader={true}
          />
        </thead>
        <tbody>
          {courseItems.size
            ? courseItems
            : <CourseListRow textFirstCell='No course available yet' />
          }
        </tbody>
      </table>
    );
  }
}

// Define styles using Aphrodite
const styles = StyleSheet.create({
  courseList: {
    border: 'solid 1px rgb(227, 220, 220)',
    width: '90%',
    textAlign: 'left',
    marginTop: '30px',
    marginLeft: '5%',
    fontFamily: `'Times New Roman', Times, serif`,
  },
});

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse
};

const mapStateToProps = (state) => {
  return {
    listCourses: getCourses(state.courses)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
