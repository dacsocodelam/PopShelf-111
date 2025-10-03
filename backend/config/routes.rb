Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products, only: [:index, :show, :create, :update, :destroy]
      post '/login', to: 'sessions#create' # <-- THÊM DÒNG NÀY
    end
  end
end