class TransactionsController < ApplicationController
  
  before_filter :require_current_user!
  
  def create
    @transaction = Transaction.new(params[:transaction])
    if @transaction
      if @transaction.save!
        render :json => @transaction
      else
        render :json => @transaction.errors.full_messages
      end
    else
      render :json => "Transaction could not be created (params not given correctly)"
    end
  end
  
  def new
    
  end
  
  def index
    @transactions = Transactions.where(:envelope_id => params[:envelope_id])
    render :json => @transactions
  end
  
  def show
    
  end
  
  def edit
    
  end
  
  def update
    @transaction = Transaction.find(params[:id])
    if @transaction
      if @transaction.update_attributes!(params[:transaction])
        render :json => @transaction
      else
        render :json => @transaction.errors.full_messages
      end
    else
      render :json => "Transaction was not found"
    end
  end
  
  def destroy
    @transaction = Transaction.find(params[:id])
    if @transaction
      if @transaction.destroy
        render :json => @transaction
      else
        render :json => @transaction.errors.full_messages
      end
    else
      render :json => "Transaction was not found"
    end
  end
end
