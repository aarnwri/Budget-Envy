BudgetApp.Views.SideBarButtonsGroupBalance = Backbone.View.extend({
    
  template: JST['side bar button groups/side_bar_buttons_group_balance'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    
    this.subViews = {};
  },
    
  createSubViews: function () {
    this.subViews['parseReceiptButtonView'] = new BudgetApp.Views.ParseReceiptButton({
      $el: $("#parse-receipt-div")
    });
  },
  
  renderSubViews: function () {
    this.subViews['parseReceiptButtonView'].render();
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({}));
    this.$el.html($renderedContent);
    
    this.createSubViews();
    this.renderSubViews();
  }
})

