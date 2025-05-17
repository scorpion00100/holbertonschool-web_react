import { thunk } from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { selectCourse, unSelectCourse, fetchCourses } from './courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

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

describe('fetchCourses()', () => {
  let middlewares, mockStore;
  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureStore(middlewares);
  });

  afterEach(() => {
    fetchMock.resetMocks();
  })

  it('returns the correct response when it succeeds', () => {
    const fetch_data = [
      {
        "id": "1",
        "name": "ES6",
        "credit": 60
      },
      {
        "id": "2",
        "name": "Webpack",
        "credit": 20
      },
      {
        "id": "3",
        "name": "React",
        "credit": 40
      }
    ];
    fetch.mockResponseOnce(JSON.stringify(fetch_data));

    const expectedActions = [
      { type: FETCH_COURSE_SUCCESS, courses: fetch_data }
    ];

    const store = mockStore({});
    return store.dispatch(fetchCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
