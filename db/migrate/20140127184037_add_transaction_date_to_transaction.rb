class AddTransactionDateToTransaction < ActiveRecord::Migration
  def change
    add_column :transactions, :transaction_date, :date
  end
end
