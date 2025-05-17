import React from 'react';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import App, { mapStateToProps } from './App';
import { Provider } from 'react-redux';
import { StyleSheetTestUtils } from 'aphrodite';

describe('<App />', () => {
  const mockStore = configureStore();
  const defaultState = fromJS({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {}
  });
  let wrapper, store;

  beforeEach(() => {
    // Disable styles during tests
    StyleSheetTestUtils.suppressStyleInjection();

    store = mockStore(defaultState);

    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    ).find('App');
  });

  describe('isLoggedIn = false', () => {
    it('renders without crashing', () => { });

    it('contains the Notifications component', () => {
      expect(wrapper.find('Notifications')).toHaveLength(1);
    });

    it('contains the Header component', () => {
      expect(wrapper.find('Header')).toHaveLength(1);
    });

    it('contains the Footer component', () => {
      expect(wrapper.find('Footer')).toHaveLength(1);
    });

    it('contains the Login component', () => {
      expect(wrapper.find('Login')).toHaveLength(1);
    });

    it('does not contain the CourseList component', () => {
      expect(wrapper.find('CourseList')).toHaveLength(0);
    });
  });

  describe('isLoggedIn = true', () => {
    it('updates the state correctly when logIn is called', () => {
      const email = 'a@a.com';
      const password = 'azerty1234';
      const expected = {
        email,
        password,
        isLoggedIn: true
      };
      wrapper.instance().logIn(email, password);
      expect(wrapper.state('user')).toEqual(expected);
    });
  });

  describe('logOut event', () => {
    it('calls logOut and shows alert when Ctrl+H is pressed', () => {
      const logOutMock = jest.fn();
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
      wrapper.setState({ logOut: logOutMock });

      // Simulate Ctrl+H keydown event
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'h',
        ctrlKey: true,
      }));

      expect(logOutMock).toBeCalled();
      expect(alertSpy).toBeCalledWith('Logging you out');

      alertSpy.mockRestore();
    });
  });

  describe('state.displayDrawer', () => {
    it('has default value set to false', () => {
      expect(wrapper.state('displayDrawer')).toBe(false);
    });

    it('changes value to true when handleDisplayDrawer() is called', () => {
      wrapper.instance().handleDisplayDrawer();
      expect(wrapper.state('displayDrawer')).toBe(true);
    });

    it('changes value to false when handleHideDrawer() is called', () => {
      wrapper.setState({ displayDrawer: true });
      wrapper.instance().handleHideDrawer();

      expect(wrapper.state('displayDrawer')).toBe(false);
    });
  });

  describe('state.listNotifications', () => {
    it('removes a notification when markNotificationAsRead is called', () => {
      const listMock = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ];
      wrapper.setState({ listNotifications: listMock });

      wrapper.instance().markNotificationAsRead(1);
      expect(wrapper.state('listNotifications')).toHaveLength(1);
      expect(wrapper.state('listNotifications').filter(n => n.id === 1)).toHaveLength(0);
    });
  });

  describe('mapStateToProps', () => {
    it('returns the right object when passing a state', () => {
      const state = fromJS({
        isUserLoggedIn: true
      });
      const expected = {
        isLoggedIn: true
      };
      expect(mapStateToProps(state)).toEqual(expected);
    });
  });
});
