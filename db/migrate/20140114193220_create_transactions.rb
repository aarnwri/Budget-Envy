class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :envelope_id, :null => false
      t.integer :amount, :null => false, :limit => 8
      t.integer :old_balance, :null => false, :limit => 8
      t.integer :new_balance, :null => false, :limit => 8
      t.string :to
      t.string :memo
      t.string :transaction_type, :null => false
      t.string :payment_type
      
      t.timestamps
    end
    add_index :transactions, :envelope_id
  end
end
