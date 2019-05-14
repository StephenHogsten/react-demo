class Account < ApplicationRecord
  VALID_STATES = {
    'AL' => true,
    'AK' => true,
    'AZ' => true,
    'AR' => true,
    'CA' => true,
    'CO' => true,
    'CT' => true,
    'DE' => true,
    'FL' => true,
    'GA' => true,
    'HI' => true,
    'ID' => true,
    'IL' => true,
    'IN' => true,
    'IA' => true,
    'KS' => true,
    'KY' => true,
    'LA' => true,
    'ME' => true,
    'MD' => true,
    'MA' => true,
    'MI' => true,
    'MN' => true,
    'MS' => true,
    'MO' => true,
    'MT' => true,
    'NE' => true,
    'NV' => true,
    'NH' => true,
    'NJ' => true,
    'NM' => true,
    'NY' => true,
    'NC' => true,
    'ND' => true,
    'OH' => true,
    'OK' => true,
    'OR' => true,
    'PA' => true,
    'RI' => true,
    'SC' => true,
    'SD' => true,
    'TN' => true,
    'TX' => true,
    'UT' => true,
    'VT' => true,
    'VA' => true,
    'WA' => true,
    'WV' => true,
    'WI' => true,
    'WY' => true,
    'AS' => true,
    'DC' => true,
    'FM' => true,
    'GU' => true,
    'MH' => true,
    'MP' => true,
    'PW' => true,
    'PR' => true,
    'VI' => true
  }.freeze

  validates *%i[account_number routing_number name street_address_1 city state zip], presence: true

  validates :account_number, format: {
    with: /\A[A-Za-z0-9]+\z/
  }

  validates :routing_number, format: {
    with: /\A\d{9}\z/
  }

  validates :state, inclusion: { in: VALID_STATES }

  validates :zip, format: {
    with: /\A\d{5}\z/
  }

  validate :routing_number_opening_digits_must_be_valid, if: :routing_number_is_9_digits?
  validate :routing_number_must_have_valid_checksum, if: :routing_number_is_9_digits?

  # force state to be uppercase
  def state
    value = super
    value.upcase unless value.nil?
  end

  def state=(value)
    value.upcase! unless value.nil?
    super(value.upcase)
  end

  def is_prefix_in_valid_range?(prefix_value)
    if (prefix_value < 13)
      return true
    elsif (prefix_value < 33)
      return prefix_value > 20
    elsif (prefix_value < 73)
      return prefix_value > 60
    else 
      return prefix_value === 80
    end
  end

  def routing_number_is_9_digits?
    pattern = /\A\d{9}\z/
    pattern.match(routing_number).present?
  end

  def routing_number_opening_digits_must_be_valid
    prefix = routing_number.slice(0, 2)
    prefix_value = prefix.to_i
    unless is_prefix_in_valid_range?(prefix_value)
      errors.add(:routing_number, 'has first two digits outside valid range')
    end
  end

  def routing_number_must_have_valid_checksum
    ach = routing_number
    multipliers = [3, 7, 1, 3, 7, 1, 3, 7, 1]
    products = multipliers.map.with_index do |multiplier, idx|
      multiplier * ach[idx].to_i
    end
    unless products.sum % 10 === 0 
      errors.add(:routing_number, 'has invalid checksum digit')
    end
  end
end
