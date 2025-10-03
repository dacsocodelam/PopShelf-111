class CreateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.string :author
      t.integer :release_year
      t.decimal :price
      t.string :genre
      t.integer :rating

      t.timestamps
    end
  end
end
