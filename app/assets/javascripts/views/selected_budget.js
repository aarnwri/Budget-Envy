BudgetApp.Views.SelectedBudget = Backbone.View.extend({
  
  template: JST['selected_budget'],
  
  events: {
    "change #budget-list": "updateActiveBudget",
  },
  
  initialize: function (options) {
    this.$el = options.$el;
    this.collection = BudgetApp.budgets;
    this.listenTo(BudgetApp.budgets, "sync remove", this.render);
  },
  
  updateActiveBudget: function () {
    var active_budget = BudgetApp.budgets.findWhere({
      name: $("#budget-list").val()
    })
    var active_budget_id = active_budget.get("id");
    BudgetApp.user.set("active_budget_id", active_budget_id);
    BudgetApp.user.save();
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
      
    }));
    this.$el.html($renderedContent);
  },
  
  
  

})