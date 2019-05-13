import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import classNames from 'classnames'

import { 
  Button,
  FormGroup,
  Loading,
  TextInput
} from 'carbon-components-react';

import {Shape} from '../data_structures/account'

class accountForm extends Component {
  constructor(props) {
    super(props)
    const account = Object.assign({}, this.props.account)
    this.state = {
      loading: account === null,
      errorMessage: null,
      account: account,
      redirect: false
    }
  }

  // componentDidUpdate(prevProps) {
  //   console.log('prevProps', prevProps)
  //   console.log('currprops', this.props)
  //   if (prevProps.hasOwnProperty('account')) {
  //     if (typeof prevProps.account !== 'undefined') {
  //       return
  //     }
  //   }
  //   this.copyPropsAccountToState()
  // }

  copyPropsAccountToState() {
    console.log('this.props.account', this.props.account)
    const account = Object.assign({}, this.props.account)
    this.setState(() => {
      return { 
        loading: false,
        account: account
      }
    })
  }

  onChangeFor(field) {
    return (ev) => {
      let value = ev.target.value
      this.setState((state) => {
        let account = Object.assign({}, state.account)
        account[field] = value
        return {
          account: account
        }
      })
    }
  }

  axiosOptions() {
    let method, url;
    if (this.state.account.id === null) {
      method = 'post'
      url = '/api/accounts'
    } else {
      method = 'patch'
      url = `/api/accounts/${this.state.account.id}`
    }
    return {
      method: method,
      url: url,
      responseType: 'json',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': this.props.token
      },
      data: {
        account: {
          "account_number": this.state.account.accountNumber,
          "routing_number": this.state.account.routingNumber,
          "name": this.state.account.name,
          "street_address_1": this.state.account.streetAddress1,
          "street_address_2": this.state.account.streetAddress2,
          "city": this.state.account.city,
          "state": this.state.account.state,
          "zip": this.state.account.zip
        }
      }
    }
  }

  onSubmit(ev) {
    ev.preventDefault()
    console.log('should submit')
    this.setState(() => {
      return {
        loading: true,
        errorMessage: ''
      }
    })
    axios(this.axiosOptions())
      .then((resp) => {
        this.props.onSave(resp.data)
        this.setState(() => {
          return {
            loading: false,
            redirect: true
          }
        })
      })
      .catch((err) => {
        console.log('err', err)
        this.setState(() => {
          return {
            errorMessage: 'There was a problem saving your new account', 
            loading: false
          }
        })
      })
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to='/accounts'/>
    }

    const loading = this.state.loading ? <Loading /> : ''
    if (this.state.account === null) {
      return loading
    }

    return (
      <div className='add-account'>
        {loading}
        <div>
          <Link to='/accounts'>&lt; All Accounts</Link>
        </div>
        <div className='add-account__container'>
          <form className='add-account__form'>
            <h4 className='add-account__title'>New Account</h4>
            <FormGroup legendText=''>
              <TextInput
                type="text"
                defaultValue={this.state.account.name}
                required
                name="account[name]"
                id="name"
                labelText="Nickname"
                placeholder="Primary Checking"
                onChange={this.onChangeFor('name')}
              />
            </FormGroup>
            <FormGroup legendText=''>
              <TextInput
                type="text"
                defaultValue={this.state.account.accountNumber}
                required
                name="account[account_number]"
                id="account_number"
                labelText="Account Number"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                onChange={this.onChangeFor('accountNumber')}
              />
            </FormGroup>
            <FormGroup legendText=''>
              <TextInput
                type="text"
                defaultValue={this.state.account.routingNumber}
                required
                name="account[routing_number]"
                id="routing_number"
                labelText="Routing Number"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                onChange={this.onChangeFor('routingNumber')}
              />
            </FormGroup>
            <FormGroup legendText='Account Address'>
              <TextInput
                type="text"
                defaultValue={this.state.account.streetAddress1}
                required
                name="account[street_address_1]"
                id="street_address_1"
                labelText="Street Address (line 1)"
                placeholder="1 Main Street"
                onChange={this.onChangeFor('streetAddress1')}
              />
            </FormGroup>
            <FormGroup legendText=''>
              <TextInput
                defaultValue={this.state.account.streetAddress2}
                type="text"
                name="account[street_address_2]"
                id="street_address_2"
                labelText="Street Address (line 2)"
                placeholder="apt 3a"
                onChange={this.onChangeFor('streetAddress2')}
              />
            </FormGroup>
            <FormGroup legendText=''>
              <TextInput
                type="text"
                defaultValue={this.state.account.city}
                required
                name="account[city]"
                id="city"
                labelText="City"
                placeholder="Washington"
                onChange={this.onChangeFor('city')}
              />
            </FormGroup>
            <FormGroup legendText=''>
              <TextInput
                type="text"
                defaultValue={this.state.account.state}
                required
                name="account[state]"
                id="state"
                labelText="State"
                placeholder="DC"
                onChange={this.onChangeFor('state')}
              />
            </FormGroup>
            <FormGroup legendText=''>
              <TextInput
                type="text"
                defaultValue={this.state.account.zip}
                required
                name="account[zip]"
                id="zip"
                labelText="Zip"
                placeholder="20036"
                onChange={this.onChangeFor('zip')}
              />
            </FormGroup>
            <Button type='submit' onClick={(ev) => this.onSubmit(ev)}>Submit</Button>
          </form>
        </div>
      </div>
    )
  }
}

accountForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  account: Shape,
  token: PropTypes.string
}

export default accountForm