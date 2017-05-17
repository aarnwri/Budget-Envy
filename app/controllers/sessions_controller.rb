class SessionsController < ApplicationController
  
  before_filter :require_no_current_user!, :only => [:create, :new]
  before_filter :require_current_user!, :only => [:destroy]
  
  def create
    @user = User.find_by_credentials(params[:credentials])
    if @user
      session[:session_token] = @user.session_token
      redirect_to main_url
    else
      flash[:errors] = []
      flash[:errors] << "Credentials were not correct"
      redirect_to root_url
    end
  end
  
  def create_guest_session
    @user = User.generate_random_guest
    session[:session_token] = @user.session_token
    redirect_to main_url
  end
  
  def new
    @user = User.new
    redirect_to root_url
  end
  
  def destroy
    logout_current_user!
    redirect_to root_url
  end
end
