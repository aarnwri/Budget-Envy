BudgetApp.Views.EnvelopeBalance = Backbone.View.extend({
    
  template: JST['envelope/envelope_balance'],
  
  events: {},
  
  initialize: function (options) {    
    this.$el = options.$el;
    this.model = options.model;

    this.listenTo(this.model, "change:balance", this.render);
    this.listenTo(this.model, "change:expected_amount", this.render);
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
      envelope: this.model
    }));
    
    this.$el.html($renderedContent); 
  }
})