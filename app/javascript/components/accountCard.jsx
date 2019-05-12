import React, { Component } from 'react';

import { Shape } from '../data_structures/account'

class AccountCard extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className='account-card'>
        <h4 className='account-card__title'>{this.props.account.name}</h4>
        <h6 className='account-card__data-label'>Account Number</h6>
        <span className='account-card__data-value'>{this.props.account.accountNumber}</span>
        <h6 className='account-card__data-label'>Routing Number</h6>
        <span className='account-card__data-value'>{this.props.account.routingNumber}</span>
      </div>
    )
  }
}

AccountCard.propTypes = {
  account: Shape
}

export default AccountCard