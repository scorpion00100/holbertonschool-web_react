import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils, css } from 'aphrodite';
import { StyleSheet } from 'aphrodite';

describe('<App />', () => {
  // Désactiver l'injection de styles Aphrodite pour éviter des erreurs pendant les tests
  StyleSheetTestUtils.suppressStyleInjection();

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('contains the Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('contains the Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer).length).toBe(1);
  });

  it('should not display CourseList when isLoggedIn is false', () => {
    const wrapper = shallow(<App isLoggedIn={false} />);
    expect(wrapper.find(CourseList).length).toBe(0);
  });

  it('should display CourseList when isLoggedIn is true', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(CourseList).length).toBe(1);
  });

  it('should not display the Login component when isLoggedIn is true', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(Login).length).toBe(0);
  });

  it('calls logOut function and displays alert when Ctrl+H is pressed', () => {
    const mockLogOut = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const wrapper = shallow(<App logOut={mockLogOut} />);
    const instance = wrapper.instance();
    instance.componentDidMount();

    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);

    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    expect(mockLogOut).toHaveBeenCalled();

    alertMock.mockRestore();
  });

  it('applies the correct footer styles', () => {
    const wrapper = shallow(<App />);
    const footer = wrapper.find('div').last();

    expect(footer.hasClass(css(StyleSheet.create({
      footer: {
        borderTop: '4px solid #cf4550',
        width: '100%',
        bottom: '0',
        left: '0',
        textAlign: 'center',
        fontSize: '20px',
        fontStyle: 'italic',
        fontFamily: 'Arial, sans-serif',
      }
    }).footer))).toBe(true);
  });

  it('applies the correct app styles', () => {
    const wrapper = shallow(<App />);
    const appDiv = wrapper.find('div').first();

    expect(appDiv.hasClass(css(StyleSheet.create({
      app: {}
    }).app))).toBe(true);
  });

});
