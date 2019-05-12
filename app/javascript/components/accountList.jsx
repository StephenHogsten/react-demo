import React, { Component } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';

import AccountCard from './accountCard';
import AddAccount from './addAccount';
import { Loading } from 'carbon-components-react';

// the list of accounts lives in this component
class AccountList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      accounts: []
    }
  }

  componentDidMount () {
    axios({
      method: 'get',
      url: "/accounts",
      responseType: 'json',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((results) => {
        let accounts = results.data === null ? [] : results.data
        this.setState((state, props) => {
          return {
            loading: false,
            accounts: accounts
          }
        })
      })
  }

  accountCards() {
    if (this.state.accounts.length === 0) {
      return <p>No Accounts Found</p>
    }
    return this.state.accounts.map( (account) => {
      return (
        <AccountCard account={account} key={account.id} />
      )
    })
  }

  onSaveAccount(newAccount) {
    this.setState((state) => {
      console.log('state', state.accounts.slice().unshift(newAccount))
      let newAccounts = state.accounts.slice()
      newAccounts.push(newAccount)
      return {
        accounts: newAccounts
      }
    })
  }

  accountCard() {
    AccountCard
  }
  
  render () {    
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <div className='accounts'>
        <AddAccount onSave={(newAccount) => this.onSaveAccount(newAccount)} token={this.props.token} />
        <div className='accounts-grid'>
          {this.accountCards()}
        </div>
      </div>
    )
  }
}

AccountList.propTypes = {
  token: PropTypes.string
}

export default AccountList


// AccountList.PropTypes = {
//   accounts: PropTypes.arrayOf(
//     PropTypes.shape({
//       Shape
//     }).isRequired
//   )
// }