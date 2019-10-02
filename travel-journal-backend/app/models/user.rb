class User < ApplicationRecord
    has_one_attached :avatar
    has_secure_password
    has_many :chapters
    has_many :pages
    has_many :pins
    has_many :albums
    validates :username, uniqueness: true
end
