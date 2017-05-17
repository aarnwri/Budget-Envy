BudgetApp.Views.CreateNewParentEnvelopeButton = Backbone.View.extend({
    
  template: JST['side bar buttons/create_new_parent_envelope_button'],
  
  events: {
    "click #create-new-parent-envelope-button": "createNewParentEnvelope"
  },
  
  initialize: function (options) {
    this.$el = options.$el;
  },
  
  createNewParentEnvelope: function () {
    var newModalCreateNewParentEnvelopeView = new BudgetApp.Views.ModalCreateNewParentEnvelope({
      $el: $("#my-modal")
    })
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
    }));
    this.$el.html($renderedContent);
  }
})