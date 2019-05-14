import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { Shape } from '../data_structures/account'

class AccountCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addressCollapsed: true
    }
  }

  collapsibleClasses() {
    return classNames(
      'avl-account-card__collapsible',
      {'avl-account-card__collapsible--is-expanded': !this.state.addressCollapsed}
    )
  }

  caretClasses() {
    return classNames(
      'avl-account-card__caret',
      {'avl-account-card__caret--is-up': !this.state.addressCollapsed}
    )
  }

  toggleCollapse() {
    this.setState((state) => {
      return {addressCollapsed: !state.addressCollapsed}
    })
  }

  render () {
    return (
      <div className='avl-account-card'>
        <button className={this.caretClasses()} onClick={() => this.toggleCollapse()}></button>
        <h4 className='avl-account-card__title'>{this.props.account.name}</h4>
        <h6 className='avl-account-card__data-label'>Account Number</h6>
        <span className='avl-account-card__data-value'>{this.props.account.accountNumber}</span>
        <h6 className='avl-account-card__data-label'>Routing Number</h6>
        <span className='avl-account-card__data-value'>{this.props.account.routingNumber}</span>
        <div className={this.collapsibleClasses()}>
          <h6 className='avl-account-card__data-label'>Street Address 1</h6>
          <span className='avl-account-card__data-value'>{this.props.account.streetAddress1}</span>
          <h6 className='avl-account-card__data-label'>Street Address 2</h6>
          <span className='avl-account-card__data-value'>{this.props.account.streetAddress2}</span>
          <h6 className='avl-account-card__data-label'>City</h6>
          <span className='avl-account-card__data-value'>{this.props.account.city}</span>
          <h6 className='avl-account-card__data-label'>State</h6>
          <span className='avl-account-card__data-value'>{this.props.account.state}</span>
          <h6 className='avl-account-card__data-label'>Zip</h6>
          <span className='avl-account-card__data-value'>{this.props.account.zip}</span>
          <Link to={`/accounts/${this.props.account.id}`} className='bx--link avl-account-card__link'>Edit</Link>
        </div>
      </div>
    )
  }
}

AccountCard.propTypes = {
  account: Shape
}

export default AccountCard