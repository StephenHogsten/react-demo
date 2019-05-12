// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

import Hello from '../components/hello'
import AccountList from '../components/accountList'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  if (root) {
    ReactDOM.render(
      (
        <div>
          <AccountList />
          <Hello name="man" />
        </div>
      ),
      root,
    )
  }
})
