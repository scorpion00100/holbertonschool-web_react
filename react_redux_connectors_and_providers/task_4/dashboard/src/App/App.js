import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';
import WithLogging from '../HOC/WithLogging';
import AppContext, { defaultUser, defaultLogOut } from './AppContext';
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest } from '../actions/uiActionCreators';

export class App extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      user: defaultUser,
      logOut: defaultLogOut,
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
      ],
    };
  }

  markNotificationAsRead = (id) => {
    const filteredNotifications = this.state.listNotifications.filter(notification => notification.id !== id);
    this.setState({ listNotifications: filteredNotifications });
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault();
      this.state.logOut();
    }
  };

  render() {
    const { user, listNotifications } = this.state;
    const { displayDrawer, isLoggedIn, displayNotificationDrawer, hideNotificationDrawer, loginRequest } = this.props;
    const isIndex = true;
    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const LoginWithLogging = WithLogging(Login);
    const NotificationsWithLogging = WithLogging(Notifications);

    const contextValue = { user, logOut: this.state.logOut };

    return (
      <AppContext.Provider value={contextValue}>
        <>
          <NotificationsWithLogging
            listNotifications={listNotifications}
            displayDrawer={displayDrawer}
            handleDisplayDrawer={displayNotificationDrawer}
            handleHideDrawer={hideNotificationDrawer}
            markNotificationAsRead={this.markNotificationAsRead}
          />
          <div className={css(styles.app)}>
            <Header />
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList listCourses={listCourses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <LoginWithLogging logIn={loginRequest} />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, iure nisi,
                at suscipit ratione quos nulla vitae distinctio, quisquam soluta adipisci fuga
                impedit a doloremque. Aspernatur dolorum possimus quo numquam.
              </p>
            </BodySection>
            <div className={css(styles.footer)}>
              <Footer />
            </div>
          </div>
        </>
      </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  app: {},
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

// Mettez à jour mapStateToProps et mapDispatchToProps
export function mapStateToProps(state) {
  return {
    isLoggedIn: state.get('isUserLoggedIn'),
    displayDrawer: state.get('isNotificationDrawerVisible'),
  };
}

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
};

// Définir propTypes et defaultProps
App.propTypes = {
  displayDrawer: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  displayNotificationDrawer: PropTypes.func.isRequired,
  hideNotificationDrawer: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
};

App.defaultProps = {
  displayDrawer: false,
  isLoggedIn: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
