BudgetApp.Views.ProjectionsFiveDaysButton = Backbone.View.extend({
    
  template: JST['projections buttons/projections_five_days_button'],
  
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