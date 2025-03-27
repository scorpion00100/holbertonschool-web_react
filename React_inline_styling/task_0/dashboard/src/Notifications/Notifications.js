import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

class Notifications extends React.Component {
  static propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.arrayOf(NotificationItemShape)
  }

  static defaultProps = {
    displayDrawer: false,
    listNotifications: []
  }

  markAsRead = id => {
    console.log(`Notification ${id} has been marked as read`)
  }

  handleClose = () => {
    console.log('Close button has been clicked')
  }

  shouldComponentUpdate(nextProps) {
    // Only update if the new listNotifications has more items than the current list
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length
    )
  }

  render() {
    const { displayDrawer, listNotifications } = this.props
    return (
      <div className="menuItem">
        <p>Your notifications</p>
        {displayDrawer ? (
          <div className="Notifications">
            <button
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
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
              <ul>
                {listNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={this.markAsRead}
                    id={notification.id}
                  />
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>
    )
  }
}

export default Notifications;
