import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Hello extends Component {
  render () {
    const { name } = this.props
    return (
      <div>Hello there, {name}</div>
    )
  }
}

Hello.propTypes = {
  name: PropTypes.string
}

Hello.defaultProps = {
  name: 'David'
}

export default Hello

