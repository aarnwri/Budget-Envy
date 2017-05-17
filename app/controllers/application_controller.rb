class ApplicationController < ActionController::Base
  include SessionsHelper
  
  protect_from_forgery
  
  private
  
  def logout_current_user!
    if current_user.guest_flag
      current_user.destroy
    else
    current_user.reset_session_token!      
    end
    session[:session_token] = nil
  end

  def require_current_user!
    redirect_to root_url if current_user.nil?
  end

  def require_no_current_user!
    redirect_to main_url unless current_user.nil?
  end
  
end
