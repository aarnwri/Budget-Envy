BudgetApp.Views.EnvelopeEditButton = Backbone.View.extend({
    
  template: JST['envelope/buttons/envelope_edit_button'],
  
  events: {
    "click .envelope-edit-button": "editEnvelope"
  },
  
  initialize: function (options) {
    this.$el = options.$el;
    this.model = options.model;

    this.render();
  },
  
  editEnvelope: function () {
    var newModalEditEnvelopeView = new BudgetApp.Views.ModalEditEnvelope({
      $el: $("#my-modal"),
      model: this.model
    })
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
    }));
    this.$el.html($renderedContent);
  }
})