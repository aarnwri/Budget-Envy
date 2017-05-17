class Budget < ActiveRecord::Base
  attr_accessible :name, :user_id
  
  validates :name, :user_id, :presence => true
  
  validate :name_must_be_unique
  validate :user_id_must_be_valid
  
  belongs_to :user
  has_many :envelopes, :dependent => :destroy
  
  def envelopes_direct_descendants
    envelopes.where(:parent_env_id => nil)
  end
  
  private
  
  def name_must_be_unique 
    same_name_budgets = Budget.where(:name => self.name, :user_id => self.user_id)
    
    # so that it doesn't check the name of itself if it already exists
    if self.id
      same_name_budgets = same_name_budgets.where("id != ?", self.id)
    end
    
    return if same_name_budgets.empty?
    errors.add(:name, "already has a budget by that name")                                               
  end
  
  def user_id_must_be_valid
    return if User.exists?(self.user_id)
    errors.add(:user_id, "that user_id does not exist in the database")
  end
  
end
