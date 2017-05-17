BudgetApp.Views.HistoryTenDaysButton = Backbone.View.extend({
    
  template: JST['history buttons/history_ten_days_button'],
  
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