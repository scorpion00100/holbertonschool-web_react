import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps } from './App';
import { fromJS } from 'immutable';

jest.mock('../path/to/image.png', () => 'image.png');

jest.mock('aphrodite', () => ({
  StyleSheet: {
    create: () => ({}),
  },
  css: () => '',
}));

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    const displayNotificationDrawerMock = jest.fn();
    const hideNotificationDrawerMock = jest.fn();
    const loginMock = jest.fn();

    wrapper = shallow(<App
        displayNotificationDrawer={displayNotificationDrawerMock}
        hideNotificationDrawer={hideNotificationDrawerMock}
        loginRequest={loginMock}
        isLoggedIn={false}
      />);
  });

  it('renders App without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should contain Notifications, Header, Footer, Login', () => {

    expect(wrapper.find('WithLogging(Notifications)').length).toBe(1);
    expect(wrapper.find('Connect(Header)').length).toBe(1);
    expect(wrapper.find('WithLogging(Login)').length).toBe(1);
    expect(wrapper.find('Connect(Footer)').length).toBe(1);
  });

  it('should not display CourseList by default', () => {
    expect(wrapper.find('CourseList').length).toBe(0);
  });

  it('should not display Login when user is logged out', () => {
    wrapper.setProps({ isLoggedIn: true });

    expect(wrapper.find('Login').length).toBe(0);
  });

it('should display CourseList when user is logged in', () => {
  wrapper.setProps({ isLoggedIn: true });

  expect(wrapper.find('CourseList').length).toBe(1);
});
});

describe('<App />', () => {
  let wrapper;
  const logOutMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<App login={() => {}} logOut={logOutMock} />);
  });

  it('should call logOut and alert when Ctrl + h is pressed', () => {
    const logOutMock = jest.fn();

    wrapper.setState({ logOut: logOutMock });

    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    window.dispatchEvent(event);

    expect(logOutMock).toHaveBeenCalled();

});
});

describe('mapStateToProps', () => {
  it('should return the correct props based on state', () => {
    const state = fromJS({
      isUserLoggedIn: true,
    });

    const expectedProps = {
      isLoggedIn: true,
    };

    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
