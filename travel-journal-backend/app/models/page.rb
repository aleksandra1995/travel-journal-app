class Page < ApplicationRecord
    has_many_attached :images
    belongs_to :user
    belongs_to :chapter
    validates :content, length: { maximum: 500 }
end
