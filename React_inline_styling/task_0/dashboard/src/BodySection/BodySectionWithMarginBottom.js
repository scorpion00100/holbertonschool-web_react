import React from 'react'
import PropTypes from 'prop-types'
import BodySection from './BodySection'
import './BodySectionWithMarginBottom.css'

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
      <div className="bodySectionWithMargin">
        <BodySection {...this.props} />
      </div>
    )
  }
}

export default BodySectionWithMarginBottom
