BudgetApp.Views.HistoryOneMonthButton = Backbone.View.extend({
    
  template: JST['history buttons/history_one_month_button'],
  
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