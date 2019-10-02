class AlbumsController < ApplicationController
    def index
        album = Album.all

        render json: album
    end

    def create
        newPin = Album.create(album_params)
        render json: newPin
    end

    def update
        album = Album.find(params[:id])
        
        album.update(album_params)
       
        render json: album
    end

    def destroy
        album = Album.find(params[:id])
        album.delete
        render json: album
    end
    private 

    def album_params
        params.permit(:url, :x, :y, :user_id, :name)
    end
end
