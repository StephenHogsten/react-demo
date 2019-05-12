import PropTypes from 'prop-types'

const Shape = PropTypes.shape({
  id: PropTypes.number.required,
  accountNumber: PropTypes.string.isRequired,
  routingNumber: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  streetAddress1: PropTypes.string.isRequired,
  streetAddress2: PropTypes.string,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired
})

export { Shape }