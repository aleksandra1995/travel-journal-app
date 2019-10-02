class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :url, :name
  belongs_to :user

end
