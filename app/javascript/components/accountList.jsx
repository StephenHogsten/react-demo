import React, { Component } from 'react';

import AccountCard from './accountCard'
import { DataTable } from 'carbon-components-react';
// De-structure `DataTable` directly to get local references

const { Table, TableHead, TableHeader, TableBody, TableCell } = DataTable;

// the list of accounts lives in this component
class AccountList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accounts: [
        {
          id: 1,
          accountNumber: 'acct1111',
          routingNumber: 'routing2222',
          name: 'my bank account',
          streetAddress1: '21 TwentyFirst Street',
          streetAddress2: 'apt 2',
          city: 'nowheresville',
          state: 'MD',
          zip: '21212'
        }
      ]
    }
  }

  accountCards() {
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
    return (
      <div className='accounts-container'>
        {this.accountCards()}
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