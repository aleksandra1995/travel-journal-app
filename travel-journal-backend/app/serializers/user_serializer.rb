class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :password, :first_name, :last_name, 
   :locations_traveled, :bio, :email, :url
  has_many :chapters
  has_many :pages
  has_many :pins

end
