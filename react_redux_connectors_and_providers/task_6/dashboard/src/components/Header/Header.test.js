import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../Header/Header'; // Importing the Header directly for shallow rendering
import logo from '../assets/holberton-logo.jpg';
import { logout } from '../actions/uiActionCreators';
import { StyleSheetTestUtils } from 'aphrodite';

describe('<Header />', () => {
  let user;
  let wrapper;
  let logoutMock;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    // Set up a mock user and logout function
    user = {
      email: 'test@example.com',
      isLoggedIn: true,
    };

    // Mock the logout function
    logoutMock = jest.fn();

    // Shallow render the Header component
    wrapper = shallow(<Header user={user} logout={logoutMock} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders an <img> tag with correct src and alt attributes', () => {
    const img = wrapper.find('img');
    expect(img).toHaveLength(1);
    expect(img.prop('src')).toEqual(logo);
    expect(img.prop('alt')).toEqual('logo');
  });

  it('renders an <h1> tag with correct text', () => {
    const h1 = wrapper.find('h1');
    expect(h1).toHaveLength(1);
    expect(h1.text()).toEqual('School dashboard');
  });

  it('renders the logout section when user is logged in', () => {
    const logoutSection = wrapper.find('#logoutSection');
    expect(logoutSection).toHaveLength(1);
    expect(logoutSection.text()).toContain('Welcome test@example.com');
  });

  it('does not render the logout section when user is not logged in', () => {
    // Set user to null for this test case
    wrapper = shallow(<Header user={null} logout={logoutMock} />);
    const logoutSection = wrapper.find('#logoutSection');
    expect(logoutSection).toHaveLength(0); // logoutSection should not exist
  });

  it('calls logout function when logout link is clicked', () => {
    const logoutLink = wrapper.find('a');
    logoutLink.simulate('click', { preventDefault: () => {} }); // Simulate click event
    expect(logoutMock).toHaveBeenCalled(); // Expect the logout function to be called
  });
});
