BudgetApp.Views.ModalCreateNewBudget = Backbone.View.extend({
    
  template: JST['modals/modal_create_new_budget'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    this.createBudget();
  },
  
  createBudget: function () {    
    this.render();
    $("#modal-create-budget").one('shown', function() {
        $(".save-budget-name").focus();
    });
    $("#modal-create-budget").modal("toggle");
    $("#modal-create-budget").on("click", "#submit-budget", this.submitForm.bind(this));
    $(".save-budget-name").keyup(function(event) {
      if(event.keyCode == 13) {
        $("#submit-budget").trigger("click");
      }
    });
  },
  
  submitForm: function () {
    var that = this;
    
    var name = $("input.save-budget-name").val();
    var budgetNames = BudgetApp.budgets.pluck("name")
    if (_.contains(budgetNames, name)) {
      alert("Budget names should be unique. Please choose another.");
      this.createBudget();
    }
    BudgetApp.budgets.create({
      name: name  
    }, {
      wait: true,
      success: function (model) {
        BudgetApp.user.set("active_budget_id", model.id);
        BudgetApp.user.save();
        that.resetModal(that.$el);
      },
      error: function () {
        that.createBudget();
      }
    })
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({  
    }));
    this.$el.html($renderedContent);
  },
})

_.extend(BudgetApp.Views.ModalCreateNewBudget.prototype, helperMethods);