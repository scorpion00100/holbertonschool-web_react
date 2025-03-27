import React from 'react'
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
    if (html) {
      return (
        <li
          data-notification-type={type}
          onClick={this.handleClick}
          dangerouslySetInnerHTML={html}
        ></li>
      )
    } else {
      return (
        <li data-notification-type={type} onClick={this.handleClick}>
          {value}
        </li>
      )
    }
  }
}

export default NotificationItem
