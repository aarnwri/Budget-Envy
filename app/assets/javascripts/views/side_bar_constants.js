BudgetApp.Views.SideBarConstants = Backbone.View.extend({
    
  template: JST['side_bar_constants'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;

    this.subViews = {};
  },
  
  createSubViews: function () {
    this.subViews['selectedBudgetView'] = new BudgetApp.Views.SelectedBudget({
      $el: $("#selected-budget")
    })
    
    this.subViews['createNewBudgetButtonView'] = new BudgetApp.Views.CreateNewBudgetButton({
      $el: $("#create-new-budget-div")
    });
    
    this.subViews['removeSelectedBudgetButtonView'] = new BudgetApp.Views.RemoveSelectedBudgetButton({
      $el: $("#remove-selected-budget-div")
    });
  },
  
  renderSubViews: function () {
    this.subViews['selectedBudgetView'].render();
    this.subViews['createNewBudgetButtonView'].render();
    this.subViews['removeSelectedBudgetButtonView'].render();
    
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({}));
    this.$el.html($renderedContent);
    
    this.createSubViews();
    this.renderSubViews();
  }
})

