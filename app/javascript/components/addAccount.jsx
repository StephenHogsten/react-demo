import React, { Component } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'

import { 
  Button,
  FormGroup,
  Loading,
  TextInput
} from 'carbon-components-react';

class AddAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      collapsed: true,
      errorMessage: null,
      id: null,
      accountNumber: null,
      routingNumber: null,
      name: null,
      streetAddress1: null,
      streetAddress2: null,
      city: null,
      state: null,
      zip:null
    }
  }

  buttonCaption() {
    if (this.state.collapsed) {
      return '+ Add Account'
    } else {
      return '- Collapse'
    }
  }

  toggleCollapse() {
    this.setState((state) => {
      return {collapsed: !state.collapsed}
    })
  }

  onChangeFor(field) {
    return (ev) => {
      let stateUpdater = {}
      stateUpdater[field] = ev.target.value
      this.setState(() => stateUpdater)
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
    axios({
      method: 'post',
      url: '/accounts',
      responseType: 'json',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': this.props.token
      },
      data: {
        account: {
          "account_number": this.state.accountNumber,
          "routing_number": this.state.routingNumber,
          "name": this.state.name,
          "street_address_1": this.state.streetAddress1,
          "street_address_2": this.state.streetAddress2,
          "city": this.state.city,
          "state": this.state.state,
          "zip": this.state.zip
        }
      }
    })
      .then((resp) => {
        console.log('success')
        console.log(resp)
        console.log(this)
        console.log(this.setState)
        this.setState(() => {
          return {collapsed: true, loading: false}
        })
        console.log('b')
        this.props.onSave(resp.data)
        console.log('c')
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
    const loading = this.state.loading ? <Loading /> : ''

    return (
      <div className='add-account'>
        {loading}
        <Button onClick={() => this.toggleCollapse()}>{this.buttonCaption()}</Button>
        <div className='add-account__container'>
          <form className={classNames(
            'add-account__form',
            {'add-account__form--is-expanded': !this.state.collapsed}
          )}>
            <h4 className='add-account__title'>New Account</h4>
            <FormGroup legendText=''>
              <TextInput
                type="text"
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
                required
                name="account[street_address_1]"
                id="street_address_1"
                labelText="Street Address (line 1)"
                placeholder="1 Main Street"
                onChange={this.onChangeFor('streetAddress1')}
              />
              <TextInput
                type="text"
                name="account[street_address_2]"
                id="street_address_2"
                labelText="Street Address (line 2)"
                placeholder="apt 3a"
                onChange={this.onChangeFor('streetAddress2')}
              />
              <TextInput
                type="text"
                required
                name="account[city]"
                id="city"
                labelText="City"
                placeholder="Washington"
                onChange={this.onChangeFor('city')}
              />
              <TextInput
                type="text"
                required
                name="account[state]"
                id="state"
                labelText="State"
                placeholder="DC"
                onChange={this.onChangeFor('state')}
              />
              <TextInput
                type="text"
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

AddAccount.propTypes = {
  onSave: PropTypes.func.isRequired,
  token: PropTypes.string
}

export default AddAccount