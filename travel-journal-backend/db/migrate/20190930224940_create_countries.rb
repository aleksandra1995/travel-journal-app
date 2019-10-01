class CreateCountries < ActiveRecord::Migration[6.0]
  def change
    create_table :countries do |t|
      t.string :name
      t.string :capital
      t.string :region
      t.string :population
      t.string :timezones
      t.string :borders
      t.string :currencies
      t.string :languages
      t.string :flag

      t.timestamps
    end
  end
end
