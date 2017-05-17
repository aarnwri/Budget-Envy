BudgetApp.Views.RemoveSelectedBudgetButton = Backbone.View.extend({
    
  //TODO: will want to add code to this view to check to see if there is a budget available to be removed (disable the button if not)  
    
  template: JST['side bar buttons/remove_selected_budget_button'],
  
  events: {
    "click #remove-selected-budget-button": "removeSelectedBudget"
  },
  
  initialize: function (options) {
    this.$el = options.$el;
  },
  
  removeSelectedBudget: function () {
    var currentBudgetId = BudgetApp.user.get("active_budget_id");
    if (currentBudgetId != null) {
      var currentBudget = BudgetApp.budgets.get(currentBudgetId)
      var confirmation = confirm("You really want to delete the budget \"" + 
        currentBudget.get("name") + "\"?");
      
      if (confirmation) {
        currentBudget.destroy();
        this.updateActiveBudgetId();
      }
    } else {
      alert("There is no budget to be removed!")
    }
  },
  
  updateActiveBudgetId: function () {
    if (BudgetApp.budgets.length > 0) {
      var newActiveBudgetId = BudgetApp.budgets.first().id;
      BudgetApp.user.set("active_budget_id", newActiveBudgetId)
    } else {
      BudgetApp.user.set("active_budget_id", null);
    }
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
    }));
    this.$el.html($renderedContent);
  }
})