json.extract! account, :id, :account_number, :routing_number, :name, :street_address_1, :street_address_2, :city, :state, :zip, :created_at, :updated_at
json.url account_url(account, format: :json)
