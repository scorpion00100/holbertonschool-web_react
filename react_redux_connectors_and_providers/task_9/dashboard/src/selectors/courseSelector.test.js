import { fromJS } from 'immutable';
import { getCourses } from './courseSelector';

describe('getCourses()', () => {
  it('select courses correctly', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ];
    const initialState = fromJS({
      courses: courses
    });

    expect(getCourses(initialState)).toEqual(fromJS(courses));
  });
});
