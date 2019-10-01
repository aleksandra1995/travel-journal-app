class CountrySerializer < ActiveModel::Serializer
  attributes :id, :name, :capital, :region, :population, :timezones, :borders, :currencies, :languages, :flag
end
