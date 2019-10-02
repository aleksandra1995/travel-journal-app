class CreateAlbums < ActiveRecord::Migration[6.0]
  def change
    create_table :albums do |t|
      t.string :user_id
      t.string :url
      t.string :name

      t.timestamps
    end
  end
end
