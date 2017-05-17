BudgetApp.Views.EnvelopeName = Backbone.View.extend({
    
  template: JST['envelope/envelope_name'],
  
  events: {},
  
  initialize: function (options) {    
    this.$el = options.$el;
    this.model = options.model;

    this.listenTo(this.model, "change:name", this.render);
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
      envelope: this.model
    }));
    
    this.$el.html($renderedContent); 
  }
})