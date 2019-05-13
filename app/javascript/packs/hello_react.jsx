// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Hello from '../components/hello'
import AccountList from '../components/accountList'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  if (root) {
    const tokenTag = document.querySelector('meta[name=csrf-token]')
    const token = tokenTag === null ? '' : tokenTag.content
    ReactDOM.render(
      (
        <BrowserRouter>
          <div>
            <Switch>
              <Route
                path='/'
                exact
                render={() => <AccountList token={token} />}
              />
              <Route render={() => <p>Invalid route</p>} />
            </Switch>
            <Hello name="man" />
          </div>
        </BrowserRouter>
      ),
      root,
    )
  }
})
