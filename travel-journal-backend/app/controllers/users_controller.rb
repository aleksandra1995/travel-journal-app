class UsersController < ApplicationController


    def profile
        render json: current_user
      end

      def index
        users = User.all
        # render json: 'hi'
        render json: users.with_attached_avatar
      end
      def show
        user = User.find(params[:id])

        render json: user
      end
      def create
        user = User.create(user_params)
        if user.valid?
            render json: {token: create_token(user.id)}
        else
          render json: { errors: user.errors.full_messages }, status: 422
        end
      end

      def update

        user = User.find(params[:id])

        user.update(user_params)

        render json: user
      end
      private

      def user_params
        params.permit(:url, :username, :password, :avatar, :first_name, :last_name, :locations_traveled, :bio, :email )
      end
end
