BudgetApp.Views.SideBarButtonsGroupBills = Backbone.View.extend({
    
  template: JST['side bar button groups/side_bar_buttons_group_bills'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    
    this.subViews = {};
  },
    
  createSubViews: function () {
    this.subViews['createNewBillButtonView'] = new BudgetApp.Views.CreateNewBillButton({
      $el: $("#create-new-bill-div")
    });
    
    this.subViews['removeBillButtonView'] = new BudgetApp.Views.RemoveBillButton({
      $el: $("#remove-bill-div")
    });
    
    this.subViews['editBillButtonView'] = new BudgetApp.Views.EditBillButton({
      $el: $("#edit-bill-div")
    });
  },
  
  renderSubViews: function () {
    this.subViews['createNewBillButtonView'].render();
    this.subViews['removeBillButtonView'].render();
    this.subViews['editBillButtonView'].render();
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({}));
    this.$el.html($renderedContent);
    
    this.createSubViews();
    this.renderSubViews();
  }
})

