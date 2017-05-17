BudgetApp.Collections.Budgets = Backbone.Collection.extend({
  
  model: BudgetApp.Models.Budget,
  
  url: function () {
    return "/users/" + BudgetApp.user.id + "/budgets"
  }
});