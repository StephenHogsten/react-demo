// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import axios from 'axios'

import {Loading} from 'carbon-components-react'

import AccountList from '../components/accountList'
import NewAccount from '../components/newAccount'
import EditAccount from '../components/editAccount'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  if (root) {
    ReactDOM.render(<App/>, root)
  }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      accounts: [],
      token: null
    }
  }

  componentDidMount () {
    const tokenTag = document.querySelector('meta[name=csrf-token]')
    const token = tokenTag === null ? '' : tokenTag.content
    this.setState((state) => {
      return {token: token}
    })
    axios({
      method: 'get',
      url: "/api/accounts",
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

  activeAccount(accountId) {
    let activeAccounts = this.state.accounts.filter((acct) => acct.id == accountId)
    return activeAccounts[0]
  }

  render() {
    const loading = this.state.loading ? <Loading/> : ''
    return (
      <BrowserRouter>
        <div className='body-container'>
          {loading}
          <Switch>
            <Route
              path='/accounts'
              exact
              render={() => {
                return (
                  <AccountList
                    token={this.state.token}
                    accounts={this.state.accounts}
                  />
                )
              }}
            />
            <Route
              path='/accounts/new'
              exact
              render={() => {
                return (
                  <NewAccount 
                    token={this.state.token}
                    onSave={(acct) => this.onSaveAccount(acct)}
                  />
                )
              }}
            />
            <Route
              path='/accounts/:accountId'
              exact
              render={(props) => {
                return (
                  <EditAccount
                    token={this.state.token}
                    onSave={(acct) => this.onSaveAccount(acct)}
                    accounts={this.state.accounts}
                    activeAccount={this.activeAccount(props.match.params.accountId)}
                  />
                )
              }}
            />
            <Redirect from="/" to="/accounts" exact="true" />
            <Route render={() => <p>Invalid route</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}