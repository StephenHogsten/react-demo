Rails.application.routes.draw do
  scope 'api' do
    resources :accounts
  end
  get '*wild', to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'pages#home'
end
