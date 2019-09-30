class PagesController < ApplicationController
    def index
        pages = Page.all

        render json: pages
    end

    def create
        newPage = Page.create(page_params)
        render json: newPage
    end

    def update
        page = Page.find(params[:id])
        
        page.update(page_params)
       
        render json: page
    end

    def destroy
        page = Page.find(params[:id])
        page.delete
        render json: page
    end
    private 

    def page_params
        params.permit(:url, :user_id, :chapter_id, :title, :date, :content, images: [])
    end
end
