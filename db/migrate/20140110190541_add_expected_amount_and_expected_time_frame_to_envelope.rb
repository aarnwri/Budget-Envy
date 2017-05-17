class AddExpectedAmountAndExpectedTimeFrameToEnvelope < ActiveRecord::Migration
  def change
    add_column :envelopes, :expected_amount, :integer
    add_column :envelopes, :expected_time, :string
  end
end
