import React, { Component } from 'react';
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

  accountCard() {
    AccountCard
  }
  
  render () {    
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <div className='accounts-container'>
        {this.accountCards()}
        <AddAccount />
      </div>
    )
  }
}

export default AccountList

// AccountList.PropTypes = {
//   accounts: PropTypes.arrayOf(
//     PropTypes.shape({
//       Shape
//     }).isRequired
//   )
// }