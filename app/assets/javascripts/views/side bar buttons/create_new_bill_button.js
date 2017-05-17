BudgetApp.Views.CreateNewBillButton = Backbone.View.extend({
    
  template: JST['side bar buttons/create_new_bill_button'],
  
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