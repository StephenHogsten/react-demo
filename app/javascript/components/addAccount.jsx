import React, { Component } from 'react';
import axios from 'axios'

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

  onChangeFor(field) {
    return (ev) => {
      let stateUpdater = {}
      stateUpdater[field] = ev.target.value
      this.setState(() => stateUpdater)
    }
  }

  onSubmit(ev) {
    ev.preventSubmit()
    console.log('should submit')
  }

  render () {
    return (
      <div className='add-account'>
        <Button>+ Add Account</Button>
        <div className='add-account__container'>
          <form className='add-account__form'>
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
                required
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
            <Button type='submit' onClick={this.submit}>Submit</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddAccount