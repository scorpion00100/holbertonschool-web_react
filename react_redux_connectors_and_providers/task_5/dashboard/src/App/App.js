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
import { fetchNotifications } from '../actions/notificationActionCreators';

export class App extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      user: defaultUser,
      logOut: defaultLogOut,
    };
  }

  markNotificationAsRead = (id) => {
     console.log(`Notification ${id} has been marked as read`);
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.props.fetchNotifications();
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
    const { user } = this.state;
    const { displayDrawer, isLoggedIn, displayNotificationDrawer, hideNotificationDrawer, loginRequest, listNotifications } = this.props;
    console.log("voici ma liste de notification", listNotifications);
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
  const notificationsMap = state.notifications.get('notifications');
  const listNotifications = notificationsMap ? notificationsMap.toJS() : [];

  return {
    isLoggedIn: state.ui.get('isUserLoggedIn'),
    displayDrawer: state.ui.get('isNotificationDrawerVisible'),
    listNotifications: Object.values(listNotifications),
  };
}

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  fetchNotifications,
};

// Définir propTypes et defaultProps
App.propTypes = {
  displayDrawer: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  displayNotificationDrawer: PropTypes.func.isRequired,
  hideNotificationDrawer: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  listNotifications: PropTypes.array.isRequired,
};

App.defaultProps = {
  displayDrawer: false,
  isLoggedIn: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
