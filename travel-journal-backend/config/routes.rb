Rails.application.routes.draw do
  resources :albums
  resources :countries
  resources :pages
  resources :chapters
  resources :users
  resources :pins

  post '/login', to: 'auth#login'	
	post '/signup', to: 'users#create'
	get '/profile', to: 'users#profile'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
