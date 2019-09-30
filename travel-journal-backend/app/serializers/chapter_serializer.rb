class ChapterSerializer < ActiveModel::Serializer 
  attributes :id, :location, :date, :url
  belongs_to :user
  has_many :pages
end
