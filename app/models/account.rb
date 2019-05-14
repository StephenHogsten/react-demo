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

  # force state to be uppercase
  def state
    state = super
    state.upcase
  end

  def state=(value)
    super(value.upcase)
  end
end
