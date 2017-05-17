BudgetApp.Collections.Envelopes = Backbone.Collection.extend({
  
  model: BudgetApp.Models.Envelope,
  
  url: function () {
    return "/users/" + BudgetApp.user.id + 
           "/budgets/" + BudgetApp.user.get("active_budget_id") +
           "/envelopes"       
  }
});