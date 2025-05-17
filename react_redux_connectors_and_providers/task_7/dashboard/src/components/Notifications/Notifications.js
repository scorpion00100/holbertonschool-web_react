import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import { fetchNotifications, markAsRead } from '../actions/notificationActionCreators';
import { getUnreadNotifications } from '../selectors/notificationSelector';


export class Notifications extends React.PureComponent {
  static propTypes = {
    listNotifications: PropTypes.object,
    fetchNotifications: PropTypes.func,
    displayDrawer: PropTypes.bool,
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
    markAsRead: PropTypes.func
  }

  static defaultProps = {
    displayDrawer: false,
    listNotifications: {},
    fetchNotifications: () => {},
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
    markAsRead: () => { },
  }

  componentDidMount() {
    const { fetchNotifications } = this.props;
    fetchNotifications();
  }

  handleClose = () => {
    console.log('Close button has been clicked');
    this.props.handleHideDrawer();
  }

  render() {
    const { displayDrawer, listNotifications, handleDisplayDrawer, markAsRead } = this.props;
    const notificationItems = listNotifications.map(notificationItem =>
      <NotificationItem
        type={notificationItem.type}
        value={notificationItem.value}
        html={notificationItem.html}
        markAsRead={() => markAsRead(notificationItem.id || notificationItem.guid)}
        key={notificationItem.id || notificationItem.guid}
        id={notificationItem.id || notificationItem.guid}
      />
    ).valueSeq();

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
            <ul className={css(styles.ul)}>
              {notificationItems.size
                ? <><p>Here is the list of notifications</p>{notificationItems}</>
                : <NotificationItem type="default" value="No new notification for now" />
              }
            </ul>
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

const mapDispatchToProps = {
  fetchNotifications,
  markAsRead
}

function mapStateToProps(state) {
  return {
    listNotifications: getUnreadNotifications(state.notifications)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
