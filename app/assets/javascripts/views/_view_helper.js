var helperMethods = {
    
  resetModal: function ($modal) {
    $modal.find('.form-inline').each(function() {
      $(this).find('input:text, input:password, input:file, select, textarea').val('');
      $(this).find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
    })
    return true;  
  },

  spoutEvent: function (event) {
    console.log("event triggered: " + event);
  },
}

