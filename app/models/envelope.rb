class Envelope < ActiveRecord::Base
  attr_accessible :name, :balance, :budget_id, :parent_env_id, :expected_amount,
                  :expected_time
   
  after_initialize :ensure_balance 
   
  validates :name, :balance, :budget_id, :presence => true
  validates :balance, :numericality => true
  validates :expected_amount, :numericality => true, :allow_nil => true
  
  validate :name_must_be_unique
  validate :expected_amount_must_be_positive
  validate :expected_time_must_be_valid
  validate :budget_id_must_be_valid
  validate :parent_env_id_must_be_valid
  
  belongs_to :budget
  
  belongs_to :parent_envelope, 
             :foreign_key => :parent_env_id, 
             :class_name => "Envelope" 
             
  has_many :child_envelopes, 
           :foreign_key => :parent_env_id, 
           :class_name => "Envelope",
           :dependent => :destroy
           
  has_many :transactions, 
           :dependent => :destroy
  
  def number_of_ancestors
    return 0 if self.parent_envelope.nil?
    return self.parent_envelope.number_of_ancestors + 1
  end
  
  private
  
  def ensure_balance
    self.balance ||= 0
  end
  
  def name_must_be_unique
    same_name_envelopes = Envelope.where(:name => self.name, 
                                         :parent_env_id => self.parent_env_id,
                                         :budget_id => self.budget_id)
                                         
    # so that it doesn't check the name of itself if it already exists
    if self.id 
      same_name_envelopes = same_name_envelopes.where("id != ?", self.id)
    end
    
    if self.parent_envelope && self.parent_envelope.name == self.name
      errors.add(:name, "can't have same name as parent")
    end
    return if same_name_envelopes.empty?
    errors.add(:name, "already has an envelope by that name")                         
  end
  
  def expected_amount_must_be_positive
    unless self.expected_amount == nil
      self.expected_amount = 0 if self.expected_amount < 0
    end
  end
  
  def expected_time_must_be_valid
    valid_times = [
      "one_week",
      "two_weeks",
      "one_month",
      "two_months",
      "three_months",
      "six_months",
      "one_year"
    ]
    
    unless self.expected_time == nil
      self.expected_time = "one_month" unless valid_times.include?(self.expected_time)
    end
  end
  
  def budget_id_must_be_valid
    return if Budget.exists?(self.budget_id)
    errors.add(:budget_id, "that budget_id does not exist in the database")
  end
  
  def parent_env_id_must_be_valid
    unless self.parent_env_id == nil
      return if Envelope.exists?(self.parent_env_id)
      errors.add(:parent_env_id, "that parent_env_id does not exist in the database")
    end
  end
end
