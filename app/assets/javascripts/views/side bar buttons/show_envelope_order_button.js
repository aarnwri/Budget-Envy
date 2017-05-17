BudgetApp.Views.ShowEnvelopeOrderButton = Backbone.View.extend({
    
  template: JST['side bar buttons/show_envelope_order_button'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
    }));
    this.$el.html($renderedContent);
  }
})