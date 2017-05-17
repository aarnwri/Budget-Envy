class RootController < ApplicationController
  
  #TODO: fix this so that a guest user can come back to their budget and edit it if it has been less than the allotted 24 hours for clean up
  
  def root
    if current_user
      logout_current_user!
    end
    render :root
  end
end
