BudgetApp.Collections.Transactions = Backbone.Collection.extend({
  
  model: BudgetApp.Models.Transaction,
  
  url: "/transactions"
});