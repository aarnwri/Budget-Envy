class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :null => false
      t.string :password_digest, :null => false
      t.string :session_token, :null => false
      t.boolean :guest_flag, :null => false, :default => false
      t.integer :active_budget_id

      t.timestamps
    end
    add_index :users, :username, :unique => true
    add_index :users, :session_token, :unique => true
    add_index :users, :guest_flag
    add_index :users, :active_budget_id, :unique => true
  end
end
