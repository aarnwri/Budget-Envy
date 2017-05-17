BudgetApp.Views.EnvelopeRemoveButton = Backbone.View.extend({
    
  template: JST['envelope/buttons/envelope_remove_button'],
  
  events: {
    "click .envelope-remove-button": "removeEnvelope"
  },
  
  initialize: function (options) {
    this.$el = options.$el;
    this.model = options.model;
    this.parentView = options.parentView;

    this.render();
  },
  
  removeEnvelope: function () {
    this.model.removeChildren();
    this.model.destroy();
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
    }));
    this.$el.html($renderedContent);
  }
})