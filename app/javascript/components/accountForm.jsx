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

const VALID_STATES = {
  AL: true,
  AK: true,
  AZ: true,
  AR: true,
  CA: true,
  CO: true,
  CT: true,
  DE: true,
  FL: true,
  GA: true,
  HI: true,
  ID: true,
  IL: true,
  IN: true,
  IA: true,
  KS: true,
  KY: true,
  LA: true,
  ME: true,
  MD: true,
  MA: true,
  MI: true,
  MN: true,
  MS: true,
  MO: true,
  MT: true,
  NE: true,
  NV: true,
  NH: true,
  NJ: true,
  NM: true,
  NY: true,
  NC: true,
  ND: true,
  OH: true,
  OK: true,
  OR: true,
  PA: true,
  RI: true,
  SC: true,
  SD: true,
  TN: true,
  TX: true,
  UT: true,
  VT: true,
  VA: true,
  WA: true,
  WV: true,
  WI: true,
  WY: true,
  AS: true,
  DC: true,
  FM: true,
  GU: true,
  MH: true,
  MP: true,
  PW: true,
  PR: true,
  VI: true
}

// references:
//  https://stackoverflow.com/questions/1540285/united-states-banking-institution-account-number-regular-expression
//  http://www.brainjar.com/js/validation/
function validAchChecksum(value) {
  const multipliers = [3, 7, 1, 3, 7, 1, 3, 7, 1]
  let products = multipliers.map((factor, idx) => {
    return factor * Number(value[idx])
  })
  console.log(products)
  let productSum = products.reduce((val, acc) => val + acc)
  console.log(productSum)
  return productSum % 10 === 0
}

function fieldErrorMessage(field, value) {
  switch(field) {
    case 'routingNumber': {
      let pattern = /^[\d]{9}$/ // 9 digits
      if (!pattern.exec(value)) {
        return 'must contain exactly 9 digits'
      }
      if (!validAchChecksum(value)) {
        return 'invalid checksum digit'
      }
      return ''
    }
    case 'accountNumber': {
      if (value.length === 0) {
        return 'must contain at least 1 character'
      }
      let pattern = /^[a-zA-Z0-9]+$/ // at least 1 alphanumeric
      if (!pattern.exec(value)) {
        return 'must contain only alphanumeric characters'
      }
      return ''
    }
    case 'state': {
      let pattern = /^[a-zA-Z]{2}$/ // two letters
      if (!pattern.exec(value)) {
        return 'must be exactly 2 letters'
      }
      let upValue = value.toUpperCase()
      if (!(upValue in VALID_STATES)) {
        return 'abbreviation not in state list'
      }
      return ''
    }
    case 'zip': {
      let pattern = /^[\d]{5}$/ // five digits
      if (!pattern.exec(value)) {
        return 'must contain exactly 5 digits'
      }
      return ''
    }
  }
  return false
}

class accountForm extends Component {
  constructor(props) {
    super(props)
    const account = Object.assign({}, this.props.account)
    this.state = {
      loading: account === null,
      errorMessage: null,
      account: account,
      fieldErrors: {},
      isNewAccount: account.id === null || account.id === '',
      redirect: false
    }
  }

  anyErrors() {
    return Object.keys(this.state.fieldErrors).length > 0
  }

  onChangeFor(field) {
    return (ev) => {
      let value = ev.target.value
      this.setState((state) => {
        let newShallowState = {
          account: Object.assign({}, state.account),
          fieldErrors: Object.assign({}, state.fieldErrors)
        }
        newShallowState.account[field] = value
        let fieldError = fieldErrorMessage(field, value)
        if (fieldError) {
          newShallowState.fieldErrors[field] = fieldError
        } else {
          delete newShallowState.fieldErrors[field]
        }
        return newShallowState
      })
    }
  }

  submitAxiosOptions() {
    let method, url;
    if (this.state.isNewAccount) {
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
    if (this.anyErrors()) {
      this.setState(() => {
        return {errorMessage: 'Unable to submit account with errors'}
      })
      return
    }
    console.log('should submit')
    this.setState(() => {
      return {
        loading: true,
        errorMessage: ''
      }
    })
    axios(this.submitAxiosOptions())
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
            errorMessage: 'We\'re sorry, there was a problem saving your account', 
            loading: false
          }
        })
      })
  }

  deleteAccount() {
    let id = this.state.account.id
    this.setState(() => {
      return {
        loading: true,
        errorMessage: ''
      }
    })
    axios({
      method: 'delete',
      url: `/api/accounts/${id}`,
      responseType: 'json',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': this.props.token
      }
    })
      .then(() => {
        this.setState(() => {
          return {
            loading: false,
            redirect: true
          }
        })
        if (typeof this.props.onDelete === 'function') {
          this.props.onDelete(id)
        } 
      })
      .catch((err) => {
        console.log('err', err)
        this.setState(() => {
          return {
            errorMessage: 'We\'re sorry, there was a problem deleting your account',
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

    let titleText, deleteButton
    if (this.state.isNewAccount) {
      titleText = 'Add Account'
      deleteButton = ''
    } else {
      titleText = 'Edit Account'
      deleteButton = <Button onClick={() => this.deleteAccount()} kind="danger">Delete Account</Button>
    }

    let errorMessage = ''
    if (this.state.errorMessage) {
      errorMessage = (
        <div className='add-account__error'>{this.state.errorMessage}</div>
      )
    }

    return (
      <div className='add-account'>
        {loading}
        <div>
          <Link to='/accounts'>&lt; All Accounts</Link>
        </div>
        <div className='add-account__container'>
          <form className='add-account__form' onSubmit={(ev) => this.onSubmit(ev)}>
            <h4 className='add-account__title'>{titleText}</h4>
            {errorMessage}
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
                invalid={this.state.fieldErrors.hasOwnProperty('accountNumber')}
                invalidText={this.state.fieldErrors.accountNumber}
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
                invalid={this.state.fieldErrors.hasOwnProperty('routingNumber')}
                invalidText={this.state.fieldErrors.routingNumber}
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
                invalid={this.state.fieldErrors.hasOwnProperty('state')}
                invalidText={this.state.fieldErrors.state}
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
                invalid={this.state.fieldErrors.hasOwnProperty('zip')}
                invalidText={this.state.fieldErrors.zip}
              />
            </FormGroup>
            {errorMessage}
            <Button type='submit' disabled={this.anyErrors()}>Submit</Button>
            {deleteButton}
          </form>
        </div>
      </div>
    )
  }
}

accountForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  account: Shape,
  token: PropTypes.string
}

export default accountForm