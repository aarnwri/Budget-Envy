BudgetApp.Views.HistorySixMonthsButton = Backbone.View.extend({
    
  template: JST['history buttons/history_six_months_button'],
  
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