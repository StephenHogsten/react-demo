// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

import Hello from '../components/hello'
import AccountList from '../components/accountList'
import AddAccount from '../components/addAccount'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  if (root) {
    const tokenTag = document.querySelector('meta[name=csrf-token]')
    const token = tokenTag === null ? '' : tokenTag.content
    ReactDOM.render(
      (
        <div>
          <AccountList token={token} />
          <Hello name="man" />
        </div>
      ),
      root,
    )
  }
})
