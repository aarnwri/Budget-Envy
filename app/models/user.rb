class User < ActiveRecord::Base
  attr_accessible :username, :password, :guest_flag, :active_budget_id
  attr_reader :password
  
  
  before_validation :ensure_session_token
    
  validates :username, :session_token, :presence => true
  validates :username, :uniqueness => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :password_digest, :presence => { :message => "Password can't be blank" }
  
  validate :active_budget_id_must_be_valid
  
  has_many :budgets, :dependent => :destroy
  has_many :envelopes, :through => :budgets, :dependent => :destroy
  
  def self.find_by_credentials(credentials)
    user = self.find_by_username(credentials[:username])
    unless user.nil?
      return user if user.is_password?(credentials[:password])
    end
    nil
  end
  
  def self.generate_random_guest
    #TODO: change pluck (will take a long time if there are a lot of users)
    usernames = User.pluck(:username)
    
    random_name = nil
    begin
      random_name = (0...16).map { (65 + rand(26)).chr }.join
    end while usernames.include?(random_name)
    
    user = self.create!(
      :username => random_name, 
      :password => random_name, 
      :guest_flag => true)
      
    budget = Budget.create!(:name => "Home", :user_id => user.id)
    user.active_budget_id = budget.id
    user.save!
    home_env = Envelope.create!(
      :name => "Home", 
      :balance => 345678, 
      :budget_id => budget.id, 
      :expected_amount => 10000, 
      :expected_time => "one_month")
    food_env = Envelope.create!(
      :name => "Food", 
      :balance => 27356, 
      :budget_id => budget.id, 
      :expected_amount => 45000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "Gas", 
      :balance => 15723, 
      :budget_id => budget.id, 
      :expected_amount => 40000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "Electric", 
      :balance => 345, 
      :budget_id => budget.id, 
      :expected_amount => 10000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "Heat", 
      :balance => 20500, 
      :budget_id => budget.id, 
      :expected_amount => 5000, 
      :expected_time => "one_month")
    car_env = Envelope.create!(
      :name => "Car", 
      :balance => 956754, 
      :budget_id => budget.id)
    Envelope.create!(
      :name => "Entertainment", 
      :balance => -12354, 
      :budget_id => budget.id, 
      :expected_amount => 5000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "Gifts", 
      :balance => 10000, 
      :budget_id => budget.id, 
      :expected_amount => 3000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "Mortgage", 
      :balance => 214300, 
      :budget_id => budget.id, 
      :parent_env_id => home_env.id, 
      :expected_amount => 200000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "Home Insurance", 
      :balance => 14567, 
      :budget_id => budget.id, 
      :parent_env_id => home_env.id, 
      :expected_amount => 10000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "Tools", 
      :balance => 32513, 
      :budget_id => budget.id, 
      :parent_env_id => home_env.id, 
      :expected_amount => 1000, 
      :expected_time => "one_month")
    junk_food_env = Envelope.create!(
      :name => "Junk Food", 
      :balance => 5000, 
      :budget_id => budget.id, 
      :parent_env_id => food_env.id, 
      :expected_amount => 5000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "New Car", 
      :balance => 830000, 
      :budget_id => budget.id, 
      :parent_env_id => car_env.id, 
      :expected_amount => 30000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "Car Insurance", 
      :balance => 124378, 
      :budget_id => budget.id, 
      :parent_env_id => car_env.id, 
      :expected_amount => 15000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "Car Maintenance", 
      :balance => 347, 
      :budget_id => budget.id, 
      :parent_env_id => car_env.id, 
      :expected_amount => 10000, 
      :expected_time => "one_month")
    Envelope.create!(
      :name => "Dining Out", 
      :balance => 347, 
      :budget_id => budget.id, 
      :parent_env_id => junk_food_env.id, 
      :expected_amount => 5000, 
      :expected_time => "one_month")
    
    user
  end
  
  #TODO: need to fix this or take it out... It is being called more than once per day and I am not sure why... I think it runs every time I start the server, but then this method is getting called multiple times. It should still only be called once. I think maybe the cron settings need to be fixed...
  
  def self.prune_guests
    Rails.logger.info "Method called by server: User.prune_guests"
    guests = self.where(:guest_flag => true)
    guests.each do |guest|
      guest.destroy if guest.created_at < 1.day.ago
    end
  end
  
  def generate_session_token
    SecureRandom::urlsafe_base64(16)
  end
  
  def reset_session_token!
    self.session_token = nil
    self.save!
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  # private
  def ensure_session_token
    self.session_token ||= self.generate_session_token
  end
  
  private
  
  def active_budget_id_must_be_valid
    return if (Budget.exists?(self.active_budget_id) ||
               self.active_budget_id == nil)
    errors.add(:active_budget_id, 
               "that active_budget_id does not exist in the database")
  end
end
