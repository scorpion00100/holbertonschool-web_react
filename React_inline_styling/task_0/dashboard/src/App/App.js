import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';
import WithLogging from '../HOC/WithLogging'


class App extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    logOut: PropTypes.func
  };

  static defaultProps = {
    isLoggedIn: false,
    logOut: () => {}
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = event => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    };
  };

  render() {
    const isIndex = true
    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ]

    const LoginWithLogging = WithLogging(Login)
    const LoginWithNotifications = WithLogging(Notifications)

    return (
      <>
        <LoginWithNotifications listNotifications={listNotifications} />
        <div className={css(styles.app)}>
          <Header />
          {this.props.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList listCourses={listCourses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>
              Here you will find the latest updates and news from the school.
            </p>
          </BodySection>
          <div className={css(styles.footer)}>
            <Footer isIndex={isIndex} />
          </div>
        </div>
      </>
    )
  }
}

// Define styles using Aphrodite
const styles = StyleSheet.create({
  app: {
  },
  footer: {
    borderTop: '4px solid #cf4550',
    width: '100%',
    bottom: '0',
    left: '0',
    textAlign: 'center',
    fontSize: '20px',
    fontStyle: 'italic',
    fontFamily: 'Arial, sans-serif',
  },
});

export default App;
