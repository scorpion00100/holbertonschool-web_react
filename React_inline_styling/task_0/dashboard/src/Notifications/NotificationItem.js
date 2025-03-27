import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types'

class NotificationItem extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    html: PropTypes.shape({
      __html: PropTypes.string
    }),
    markAsRead: PropTypes.func,
    id: PropTypes.number
  };

  static defaultProps = {
    type: 'default',
    value: '',
    html: null,
    markAsRead: () => {},
    id: null
  };

  handleClick = () => {
    const { markAsRead, id } = this.props
    if (markAsRead && id !== null) {
      markAsRead(id)
    }
  };

  render() {
    const { type, value, html } = this.props
    const style = type === 'urgent' ? styles.urgent : styles.default;

    if (html) {
      return (
        <li
          className={css(style)}
          data-notification-type={type}
          onClick={this.handleClick}
          dangerouslySetInnerHTML={html}
        ></li>
      )
    } else {
      return (
        <li  className={css(style)} data-notification-type={type} onClick={this.handleClick}>
          {value}
        </li>
      )
    }
  }
}

const styles = StyleSheet.create({
  default: {
    color: '#180C5F',
  },
  urgent: {
    color: 'red',
  }
});

export default NotificationItem
