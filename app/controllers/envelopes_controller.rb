class EnvelopesController < ApplicationController
  
  before_filter :require_current_user!
  
  def create
    @envelope = Envelope.new(params[:envelope])
    if @envelope
      if @envelope.save!
        render :json => @envelope
      else
        render :json => @envelope.errors.full_messages
      end
    else
      render :json => "Envelope could not be created (params not given correctly)"
    end
  end
  
  def new
    
  end
  
  def index
    
  end
  
  def show

  end
  
  def edit
    
  end
  
  def update
    @envelope = Envelope.find(params[:id])
    if @envelope
      if @envelope.update_attributes!(params[:envelope])
        render :json => @envelope
      else
        render :json => @envelope.errors.full_messages
      end
    else
      render :json => "Envelope was not found"
    end
  end
  
  def destroy
    @envelope = Envelope.find(params[:id])
    if @envelope
      if @envelope.destroy
        render :json => @envelope
      else
        render :json => @envelope.errors.full_messages
      end
    else
      render :json => "Envelope was not found"
    end
  end
end
