import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import AccountCard from './accountCard';
import { Shape as AccountShape } from '../data_structures/account'

// the list of accounts lives in this component
class AccountList extends Component {
  accountCards() {
    if (this.props.accounts.length === 0) {
      return <p className='avl-error-message accounts-grid__error'>No Accounts Found</p>
    }
    return this.props.accounts.map( (account) => {
      return (
        <AccountCard account={account} key={account.id} />
      )
    })
  }

  render () {    
    return (
      <div className='accounts'>
        <h2 className='accounts__title'>All Accounts</h2>
        <Link className='bx--link' to='/accounts/new'>+ Add Account</Link>
        <div className='accounts-grid'>
          {this.accountCards()}
        </div>
      </div>
    )
  }
}

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(AccountShape)
}

export default AccountList