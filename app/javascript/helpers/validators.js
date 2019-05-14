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

// validAchPrefix checks that the first two digits are in one of the following ranges:
// 00-12
// 21-32
// 61-72
// 80
// reference: https://en.wikipedia.org/wiki/ABA_routing_transit_number
// validAchPrefix assumes the passed value has at least two digits at the beginning
function validAchPrefix(value) {
  let prefixValue = Number(value.slice(0,2))
  if (prefixValue < 13) {
    return true
  } else if (prefixValue < 33) {
    return prefixValue > 20
  } else if (prefixValue < 73) {
    return prefixValue > 60
  } else {
    return prefixValue === 80
  }
}

// all error functions return an error message if invalid
// an empty response means no error
export function routingNumberError(value) {
  let pattern = /^[\d]{9}$/ // 9 digits
  if (!pattern.exec(value)) {
    return 'must contain exactly 9 digits'
  }
  if (!validAchPrefix(value)) {
    return 'first two digits are not a valid combination'
  }
  if (!validAchChecksum(value)) {
    return 'invalid checksum digit'
  }
  return ''
}

export function accountNumberError(value) {
  if (value.length === 0) {
    return 'must contain at least 1 character'
  }
  let pattern = /^[a-zA-Z0-9]+$/ // at least 1 alphanumeric
  if (!pattern.exec(value)) {
    return 'must contain only alphanumeric characters'
  }
  return ''
}

export function stateError(value) {
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

export function zipError(value) {
  let pattern = /^[\d]{5}$/ // five digits
  if (!pattern.exec(value)) {
    return 'must contain exactly 5 digits'
  }
  return ''
}

export function fieldErrorMessage(field, value) {
  switch(field) {
    case 'routingNumber': {
      return routingNumberError(value)
    }
    case 'accountNumber': {
      return accountNumberError(value)
    }
    case 'state': {
      return stateError(value)
    }
    case 'zip': {
      return zipError(value)
    }
  }
  return false
}