class PinsController < ApplicationController
    def index
        pin = Pin.all

        render json: pin
    end

    def create
        newPin = Pin.create(pin_params)
        render json: newPin
    end

    def update
        pin = Pin.find(params[:id])
        
        pin.update(pin_params)
       
        render json: pin
    end

    def destroy
        pin = Pin.find(params[:id])
        pin.delete
        render json: pin
    end
    private 

    def pin_params
        params.permit(:url, :x, :y, :user_id)
    end
end