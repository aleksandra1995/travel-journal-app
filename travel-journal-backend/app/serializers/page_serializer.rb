class PageSerializer < ActiveModel::Serializer 
  attributes :id, :title, :date, :content, :url, :created_at

  belongs_to :user
  belongs_to :chapter
end
