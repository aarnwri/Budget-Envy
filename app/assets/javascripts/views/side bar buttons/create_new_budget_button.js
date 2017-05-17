BudgetApp.Views.CreateNewBudgetButton = Backbone.View.extend({
    
  template: JST['side bar buttons/create_new_budget_button'],
  
  events: {
    "click #create-new-budget-button": "createNewBudget"
  },
  
  initialize: function (options) {
    this.$el = options.$el;
  },
  
  createNewBudget: function () {
    var newModalCreateNewBudgetView = new BudgetApp.Views.ModalCreateNewBudget({
      $el: $("#my-modal")
    })
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
    }));
    this.$el.html($renderedContent);
  }
})