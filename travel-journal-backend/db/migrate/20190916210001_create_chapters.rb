class CreateChapters < ActiveRecord::Migration[6.0]
  def change
    create_table :chapters do |t|
      t.string :url
      t.string :location
      t.string :date
      t.integer :user_id


      t.timestamps
    end
  end
end
