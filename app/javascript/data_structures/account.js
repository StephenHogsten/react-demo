import PropTypes from 'prop-types'

const Shape = PropTypes.shape({
  id: PropTypes.number.required,
  accountNumber: PropTypes.string.isRequired,
  routingNumber: PropTypes.string.isRequired,
  name: PropTypes.string,
  streetAddress1: PropTypes.string.isRequired,
  streetAddress2: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string
})

export { Shape }