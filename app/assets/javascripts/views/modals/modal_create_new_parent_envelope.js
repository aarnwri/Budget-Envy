BudgetApp.Views.ModalCreateNewParentEnvelope = Backbone.View.extend({
    
  template: JST['modals/modal_create_new_parent_envelope'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    this.createEnvelope();
  },
  
  createEnvelope: function () {
    var that = this;
    
    this.collection = new BudgetApp.Collections.Envelopes(BudgetApp.envelopes.where({
      budget_id: BudgetApp.user.get("active_budget_id"),
      parent_env_id: null
    }));
    this.render();
    $("#modal-create-new-parent-envelope").one('shown', function() {
      $(this).find(".save-parent-envelope-name").focus();
    });
    $("#modal-create-new-parent-envelope").modal("toggle");
    $("#modal-create-new-parent-envelope").on("click", "#submit-parent-envelope", this.submitForm.bind(this)); 
    $(".save-parent-envelope-name, .save-parent-envelope-balance, .save-parent-envelope-expected-amount, .save-parent-envelope-expected-time").keyup(function(event) {
      if(event.keyCode == 13) {
        $("#submit-parent-envelope").trigger("click");
      }
    });
  },
  
  submitForm: function () {
    var that = this;
    
    var name = $(".save-parent-envelope-name").val();
    var initialBalance = $(".save-parent-envelope-balance").val();
    var expectedAmount = $(".save-parent-envelope-expected-amount").val();
    var expectedTime = $(".save-parent-envelope-expected-time").val();
    
    initialBalance = BudgetApp.Models.Envelope.parseBalance(initialBalance);
    expectedAmount = BudgetApp.Models.Envelope.parseBalance(expectedAmount);
    
    var parentEnvelopeNames = this.collection.pluck("name");
    if (_.contains(parentEnvelopeNames, name)) {
      alert("Envelopes on the same level should have unique names. Please choose another.");
      this.createEnvelope();
    }
    
    BudgetApp.envelopes.create({
      name: name,
      balance: initialBalance,
      budget_id: BudgetApp.user.get("active_budget_id"),
      parent_env_id: null,
      expected_amount: expectedAmount,
      expected_time: expectedTime
    }, {
      wait: true,
      success: function (model) {
        BudgetApp.envelopes.add(model)
        that.resetModal(that.$el);
      },
      failure: function () {
        that.createEnvelope();
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

_.extend(BudgetApp.Views.ModalCreateNewParentEnvelope.prototype, helperMethods);