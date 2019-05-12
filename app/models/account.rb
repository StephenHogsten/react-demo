class Account < ApplicationRecord
  validates *%i[account_number routing_number name street_address_1 city state zip], presence: true
end
