class ChaptersController < ApplicationController
    def index
        chapters = Chapter.all

        render json: chapters
    end

    def create
       newChapter = Chapter.create(chapter_params)
        render json: newChapter
    end

    def update
        chapter = Chapter.find(params[:id])
        
        chapter.update(chapter_params)
       
        render json: chapter
    end

    def destroy
        chapter = Chapter.find(params[:id])
        chapter.delete
        render json: chapter
    end

    private

    def chapter_params
        params.permit(:url, :date, :location, :user_id, :id)
    end
end
