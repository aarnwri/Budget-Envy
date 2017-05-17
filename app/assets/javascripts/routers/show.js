BudgetApp.Routers.Show = Backbone.Router.extend({
  routes: {
    "": "showBudget"
  },
  
  initialize: function (options) {
    this.budget_id = options.id;
  },
  
  showBudget: function () {
    this.showView = new BudgetApp.Views.Show({
      $el: $("#budget")
    })
    
    this.showView.render();
  }
})