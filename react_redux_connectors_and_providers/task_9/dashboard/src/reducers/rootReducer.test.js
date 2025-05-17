import { fromJS } from 'immutable';
import rootReducer from './rootReducer';

describe('Root Reducer', () => {
  it('should return the initial state', () => {
    // Créer l'état initial attendu sous forme immuable
    const expectedState = fromJS({
      courses: {
        courses: [],
      },
      notifications: {
        filter: 'DEFAULT',
        notifications: {},
      },
      ui: {
        isNotificationDrawerVisible: false,
        isUserLoggedIn: false,
        user: null,
      },
    });

    // Récupérer l'état initial du reducer
    const receivedState = rootReducer(undefined, {});

    // Appliquer toJS() aux parties immuables
    expect(receivedState.courses.toJS()).toEqual(expectedState.get('courses').toJS());
    expect(receivedState.notifications.toJS()).toEqual(expectedState.get('notifications').toJS());
    expect(receivedState.ui.toJS()).toEqual(expectedState.get('ui').toJS());
  });
});
