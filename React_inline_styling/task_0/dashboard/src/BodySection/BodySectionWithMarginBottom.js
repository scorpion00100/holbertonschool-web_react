import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types'
import BodySection from './BodySection'

class BodySectionWithMarginBottom extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  render() {
    return (
      <div className={css(styles.bodySectionWithMargin)}>
        <BodySection {...this.props} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px',
  },
});

export default BodySectionWithMarginBottom
