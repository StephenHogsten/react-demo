import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { AccountFactory } from '../data_structures/account'
import AccountForm from './accountForm'

class NewAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: AccountFactory()
    }
  }
  render() {
    return (
      <AccountForm
        onSave={(acc) => this.props.onSave(acc)}
        account={this.state.account}
        token={this.props.token}
      />
    )
  }
}

NewAccount.propTypes = {
  token: PropTypes.string,
  onSave: PropTypes.func.isRequired
}

export default NewAccount