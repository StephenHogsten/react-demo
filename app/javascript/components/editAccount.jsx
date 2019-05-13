import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Shape as AccountShape } from '../data_structures/account'
import AccountForm from './accountForm'

class editAccount extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AccountForm
        onSave={(acc) => this.props.onSave(acc)}
        account={this.props.activeAccount}
        token={this.props.token}
        key={typeof this.props.activeAccount === 'undefined' ? 0 : this.props.activeAccount.id}
      />
    )
  }
}

editAccount.propTypes = {
  token: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  activeAccount: AccountShape
}

export default editAccount