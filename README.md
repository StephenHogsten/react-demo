# README

## Get Started
* these steps assume rails, bundler, yarn, postgres are all already installed
1. clone this repo
2. run `bundle install` to install all gem dependencies
3. run `yarn install` to install all npm dependencies
4. run `rails db:setup` to create a development pg database and run migrations
5. run `rails s` to start a local rails server
6. visit localhost:3000 to view the app

## Comments
* I can't think of a legitimate purpose, but this app would let anyone contribute to a giant list of bank accounts and associated addresses. These are everywhere referred to as "accounts"
  * once added, the card should be added to this list.  Each card has a caret for expansion (view address and edit button)
* Rather than implementing everything (especially visual style) from scratch, I used IBM's [carbon design system](https://www.carbondesignsystem.com/). I'm not positive that this was less trouble than it was worth.
  * there is a warning when icons appear. That will soon be in the react version of the carbon library: [see here](https://github.com/carbon-design-system/carbon-elements/issues/498)
* if this were not just a one-time assignment, the next steps I would take would be:
  * set-up unit tests on both sides
  * wrap with docker to make it easier to share / setup continuous testing
  * extract out the text inputs to simplify accountForm
  * add redux if the complexity would get a lot higher than it is now
* I wasn't completely clear what the address is, so I treated it as a user's address for an account (rather than the bank's address)
* I generally used [BEM](http://getbem.com/naming/) naming conventions for classes with a prefix of 'avl' to avoid any potential collisions
* I kept the validation pretty simple
  * **bank account number** must be only comprised of alphanumeric characters
    * at least according to several SO threads I couldn't find any real standards for bank account number (e.g. [this one](https://stackoverflow.com/questions/1540285/united-states-banking-institution-account-number-regular-expression)). 
  * **routing number** must be 9 digits and must have a valid "checksum" digit according to [this logic](http://www.brainjar.com/js/validation/)
  * **zip** must be 5 digits (no 9 digit zips)
  * **state** must be an abbreviation corresponding to a US state or commonwealth territory
    * quickly pulled a list from [here](https://www.50states.com/abbreviations.htm)
  * all fields are required except for **address line 2**
  * some 