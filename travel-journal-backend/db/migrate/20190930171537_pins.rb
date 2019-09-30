class Pins < ActiveRecord::Migration[6.0]
  def change
    create_table :pins do |t|
      t.string :url
      t.integer :user_id
      t.integer :x
      t.integer :y
    end
  end
end
