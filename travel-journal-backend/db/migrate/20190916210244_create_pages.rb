class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.string :url
      t.string :title
      t.datetime :date
      t.string :content
      t.integer :user_id
      t.integer :chapter_id


      t.timestamps
    end
  end
end
