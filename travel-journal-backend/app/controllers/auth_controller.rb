class AuthController < ApplicationController

    def login
        # find the user
        user = User.find_by(username: params[:username])
        # if user exists and they are really the user via password, send the returning user a token
        if user && user.authenticate(params[:password])
          render json: {token: create_token(user.id)}
        else
          render json: {errors: ["Invalid username or password"]}, status: 422
        end
    
      end
      
end
