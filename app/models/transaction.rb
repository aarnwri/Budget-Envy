class Transaction < ActiveRecord::Base
  attr_accessible :envelope_id, :amount, :old_balance, :new_balance, :to, :memo, 
                  :transaction_type, :payment_type, :transaction_date
  
  validates :envelope_id, :amount, :old_balance, :new_balance, :transaction_type,
            :transaction_date, :presence => true
  validates :envelope_id, :amount, :old_balance, :new_balance, :numericality => true
  
  validate :envelope_id_must_be_valid
  validate :transaction_type_must_be_valid
  validate :payment_type_must_be_valid
  validate :old_balance_must_be_accurate
  validate :new_balance_must_be_accurate
  validate :amount_must_not_be_zero
  
  
  belongs_to :envelope
             
  private
  
  def old_balance_must_be_accurate
    last_transaction = Transaction.where(:envelope_id => self.envelope_id).last
    puts last_transaction
    unless last_transaction == nil
      old_balance = last_transaction.new_balance
    else
      envelope = Envelope.find_by_id(self.envelope_id)
      old_balance = envelope.balance unless envelope == nil
    end
    return if (old_balance == self.old_balance)
    errors.add(:old_balance, "old_balance and last transaction balance must match")
  end
  
  def new_balance_must_be_accurate
    puts self.new_balance
    puts self.old_balance
    puts self.amount
    return if (self.new_balance - self.old_balance == self.amount)
    errors.add(:new_balance, 
               "new_balance not accurate (based on old_balance and amount)")
  end
  
  def transaction_type_must_be_valid
    transaction_types = [
      "deposit",
      "withdrawal"
    ]
    
    if transaction_types.include?(self.transaction_type)
      return if self.transaction_type == "deposit" && self.amount > 0
      return if self.transaction_type == "withdrawal" && self.amount < 0
      #separate validation to check if self.amount == 0
    else
      errors.add(:transaction_type, "invalid transaction_type submitted")
    end
  end
  
  def payment_type_must_be_valid
    payment_types = [
      "cash",
      "check",
      "credit_card"
    ]
    unless self.payment_type == nil
      return if payment_types.include?(self.payment_type)
      errors.add(:payment_type, "invalid payment_type submitted")      
    end
  end
  
  def amount_must_not_be_zero
    return unless self.amount == 0
    errors.add(:amount, "invalid amount: cannot be zero")
  end
  
  def envelope_id_must_be_valid
    return if Envelope.exists?(self.envelope_id)
    errors.add(:envelope_id, "that envelope_id does not exist in the database")
  end
end
