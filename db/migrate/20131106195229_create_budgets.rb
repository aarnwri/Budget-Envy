class CreateBudgets < ActiveRecord::Migration
  def change
    create_table :budgets do |t|
      t.string :name, :null => false
      t.integer :user_id, :null => false

      t.timestamps
    end
    add_index :budgets, [:user_id, :name], :unique => true
    add_index :budgets, :name
    add_index :budgets, :user_id
  end
end
