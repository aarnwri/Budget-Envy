BudgetApp.Views.SideBarButtonsGroupAccounts = Backbone.View.extend({
    
  template: JST['side bar button groups/side_bar_buttons_group_accounts'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    
    this.subViews = {};
  },
  
  createSubViews: function () {
    // TODO: this is where any views for buttons associated with the accounts tab will go
  },
  
  renderSubViews: function () {
    // TODO: this is where views will be rendered in a particular order for the accounts view
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({}));
    this.$el.html($renderedContent);
    
    this.createSubViews();
    this.renderSubViews();
  }
})

