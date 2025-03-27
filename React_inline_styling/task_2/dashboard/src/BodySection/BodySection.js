import React from "react"
import PropTypes from 'prop-types'
import './BodySection.css'

class BodySection extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    children: null
  };

  render() {
    const { title, children } = this.props;

    return (
      <div className="bodySection">
        <h2>{title}</h2>
        {children}
      </div>
    );
  }
}

export default BodySection
