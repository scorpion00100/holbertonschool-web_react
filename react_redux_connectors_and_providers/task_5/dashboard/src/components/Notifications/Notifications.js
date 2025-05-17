import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

class Notifications extends React.PureComponent {
  static propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.arrayOf(NotificationItemShape),
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
    markNotificationAsRead: PropTypes.func,
    fetchNotifications: PropTypes.func,
  }

  static defaultProps = {
    displayDrawer: false,
    listNotifications: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
    markNotificationAsRead: () => {},
    fetchNotifications: () => {},
  }

  componentDidMount() {
    this.props.fetchNotifications();
  }

  handleClose = () => {
    console.log('Close button has been clicked');
    this.props.handleHideDrawer();
  }

  render() {
    const { displayDrawer, listNotifications, handleDisplayDrawer, markNotificationAsRead } = this.props;
    console.log("ma listNotifications", listNotifications.map);
    return (
      <>
        {!displayDrawer && (
          <div id="menu-item" className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
            <p>Your notifications</p>
          </div>
        )}

        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button
              id="close-btn"
              className={css(styles.closeBtn)}
              aria-label="Close"
              onClick={this.handleClose}
            >
              x
            </button>
            <p>Here is the list of notifications</p>
            {listNotifications.length === 0 ? (
              <NotificationItem
                type="default"
                value="No new notification for now"
              />
            ) : (
              <ul className={css(styles.ul)}>
                {listNotifications.map(notification => (
                  <NotificationItem
                    key={notification.guid}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={markNotificationAsRead(notification.guid)}
                    id={notification.guid}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </>
    );
  }
}

const opacityFrames = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 }
};

const bounceFrames = {
  '0%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-5px)' },
  '100%': { transform: 'translateY(5px)' }
};

const styles = StyleSheet.create({
  notifications: {
    position: 'absolute',
    border: 'dashed #cf4550 2px',
    padding: '10px',
    width: '30%',
    right: '1rem',
    top: '4rem',
    '@media (max-width: 900px)': {
      inset: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      padding: 0,
      backgroundColor: 'white',
    },
  },
  ul: {
    '@media (max-width: 900px)': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      fontSize: '20px',
    },
  },
  menuItem: {
    position: 'fixed', // Float above other elements
    right: '10px',
    top: '10px',
    backgroundColor: '#fff8f8', // Light red background
    padding: '10px',
    cursor: 'pointer', // Change cursor to pointer on hover
    ':hover': {
      animationName: [opacityFrames, bounceFrames],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3',
      animationTimingFunction: 'ease-in-out',
    },
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    '@media (max-width: 900px)': {
      top: 0,
      right: '.5rem'
    },
  }
});

export default Notifications;
