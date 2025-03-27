import React, { Component } from 'react'

function WithLogging(WrappedComponent) {
  return class extends Component {
    // Assign the correct display name for debugging
    static displayName = `WithLogging(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`

    // Log message on component mount
    componentDidMount() {
      const componentName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      console.log(`Component ${componentName} is mounted`)
    }

    // Log message on component unmount
    componentWillUnmount() {
      const componentName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      console.log(`Component ${componentName} is going to unmount`)
    }

    // Render the wrapped component with the passed props
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default WithLogging
