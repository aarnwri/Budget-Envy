class CreateEnvelopes < ActiveRecord::Migration
  def change
    create_table :envelopes do |t|
      t.string :name, :null => false
      t.integer :balance, :null => false, :limit => 8
      t.integer :parent_env_id
      t.integer :budget_id, :null => false
      
      t.timestamps
    end
    add_index :envelopes, [:budget_id, :parent_env_id, :name], :unique => true
    add_index :envelopes, :parent_env_id
    add_index :envelopes, :name
  end
end
