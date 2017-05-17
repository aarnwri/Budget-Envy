class BudgetsController < ApplicationController
  
  before_filter :require_current_user!
  
  def create
    params[:user_id] = current_user.id
    @budget = Budget.new(:name => params[:name], :user_id => params[:user_id])
    if @budget
      if @budget.save!
        render :json => @budget
      else
        flash[:errors] = @budget.errors.full_messages
      end
    else
      flash[:errors] = []
      flash[:errors] << "budget was nil and could not be saved"
    end
  end
  
  def new
    
  end
  
  def index
    @budgets = current_user.budgets
    render :index
  end
  
  def show
    @budget = Budget.find(params[:id])
    render :show
  end
  
  def edit
    
  end
  
  def update
    
  end
  
  def destroy
    @budget = Budget.find(params[:id])
    if @budget
      if @budget.destroy
        render :json => @budget
      else
        render :json => @budget.errors.full_messages
      end
    else
      render :json => "Budget was not found"
    end
  end
end
