class UsersController < ApplicationController
  
  before_filter :require_no_current_user!, :only => [:create, :new]
  before_filter :require_current_user!, :only => :show
  
  def create
    @user = User.new(params[:user])
    if @user
      if @user.save
        session[:session_token] = @user.session_token
        redirect_to main_url
      else
        flash[:errors] = @user.errors.full_messages
        redirect_to :root
      end
    else
      flash[:errors] = []
      flash[:errors] << "No User Found"
      head 404
    end
  end
  
  def update
    @user = User.find(params[:id])
    if @user
      if @user.update_attributes!(params[:user])
        render :json => @user;
      else
        render :json => @user.errors.full_messages
      end
    else
      render :json => "User not found"
    end
  end
  
  def new
    @user = User.new
    redirect_to root_url
  end
  
  def show
    @user = current_user  
    respond_to do |format|
      format.html { render :show }
      format.json { render :json => @user, :include => [:budgets, :envelopes] }
    end
  end
  
  def main
    @user = current_user  
    render :main
  end
end
