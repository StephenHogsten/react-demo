import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Shape as AccountShape } from '../data_structures/account'
import AccountForm from './accountForm'

class EditAccount extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AccountForm
        onSave={(acc) => this.props.onSave(acc)}
        onDelete={(id) => this.props.onDelete(id)}
        account={this.props.activeAccount}
        token={this.props.token}
        key={typeof this.props.activeAccount === 'undefined' ? 0 : this.props.activeAccount.id}
      />
    )
  }
}

EditAccount.propTypes = {
  token: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  activeAccount: AccountShape,
  onDelete: PropTypes.func.isRequired
}

export default EditAccount