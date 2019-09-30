class PinSerializer < ActiveModel::Serializer 
  attributes :id, :x, :y, :url

    belongs_to :user 
  end
  