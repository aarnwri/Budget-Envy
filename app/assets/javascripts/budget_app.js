window.BudgetApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    user_data = JSON.parse($("#bootstrapped_user_data").html());
    
    BudgetApp.budgets = new BudgetApp.Collections.Budgets(user_data.budgets);
    BudgetApp.envelopes = new BudgetApp.Collections.Envelopes(user_data.envelopes);
    delete user_data.budgets;
    delete user_data.envelopes;
    
    BudgetApp.user = new BudgetApp.Models.User(user_data);
    BudgetApp.transactions = new BudgetApp.Collections.Transactions();
    BudgetApp.parentEnvelopes = new BudgetApp.Collections.Envelopes(BudgetApp.envelopes.where({
      parent_env_id: null
    }));
    BudgetApp.subEnvelopeCollections = {};
    
    BudgetApp.envelopes.on("add remove", function () {
      var updatedParentEnvelopes = BudgetApp.envelopes.where({
        parent_env_id: null
      });
      if (updatedParentEnvelopes.length != BudgetApp.parentEnvelopes.models.length) {
        BudgetApp.parentEnvelopes.trigger("add", "remove");
      }
    });
    
    BudgetApp.router = new BudgetApp.Routers.Show({
      id: BudgetApp.user.active_budget_id
    });
    
    Backbone.history.start();
  }
};

$(document).ready(function () {
  if (window.location.pathname === "/main") {
    BudgetApp.initialize();
  }
});
