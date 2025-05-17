import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';
import { login, logout, displayNotificationDrawer, hideNotificationDrawer, loginRequest } from './uiActionCreators';
import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionTypes';


describe('uiActionCreators tests', () => {
  it('login should create the correct action', () => {
    const email = 'test@example.com';
    const password = '123456';
    const expectedAction = {
      type: LOGIN,
      user: { email, password },
    };
    expect(login(email, password)).toEqual(expectedAction);
  });

  it('logout should create the correct action', () => {
    const expectedAction = {
      type: LOGOUT,
    };
    expect(logout()).toEqual(expectedAction);
  });

  it('displayNotificationDrawer should create the correct action', () => {
    const expectedAction = {
      type: DISPLAY_NOTIFICATION_DRAWER,
    };
    expect(displayNotificationDrawer()).toEqual(expectedAction);
  });

  it('hideNotificationDrawer should create the correct action', () => {
    const expectedAction = {
      type: HIDE_NOTIFICATION_DRAWER,
    };
    expect(hideNotificationDrawer()).toEqual(expectedAction);
  });
});

describe('loginRequest action creator', () => {
  let mockStore;
  const middlewares = [thunk]; // Ajoute le middleware thunk

  beforeEach(() => {
    fetchMock.enableMocks();  // Activer fetchMock
    fetchMock.resetMocks();   // Réinitialiser les mocks avant chaque test
    const configureStore = configureMockStore(middlewares); // Créer le mockStore avec le middleware
    mockStore = configureStore; // Assigner la fonction mockStore
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should dispatch LOGIN and LOGIN_SUCCESS when API returns the correct response', async () => {
    const email = 'a@a.com';
    const password = 'azerty1234';
    fetchMock.mockResponseOnce(JSON.stringify({
      email,
      success: true
    }));

    const expectedActions = [
      { type: LOGIN, user: { email, password } },
      { type: LOGIN_SUCCESS }
    ];

    const store = mockStore({});
    return store.dispatch(loginRequest(email, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch LOGIN and LOGIN_FAILURE when API returns an error', async () => {
    const email = 'a@a.com';
    const password = 'azerty1234';
    fetchMock.mockReject(new Error('404'));

    const expectedActions = [
      { type: LOGIN, user: { email, password } },
      { type: LOGIN_FAILURE }
    ];

    const store = mockStore({});
    return store.dispatch(loginRequest(email, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
