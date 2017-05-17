BudgetApp.Views.ModalCreateNewSubEnvelope = Backbone.View.extend({
    
  template: JST['modals/modal_create_new_sub_envelope'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    this.parent_env_id = options.parentView.model.id;
    this.parentView = options.parentView;
    
    this.createEnvelope();
  },
  
  createEnvelope: function () {
    var that = this;
    
    this.collection = new BudgetApp.Collections.Envelopes(BudgetApp.envelopes.where({
      budget_id: BudgetApp.user.get("active_budget_id"),
      parent_env_id: this.parent_env_id
    }));
    
    this.render();
    $("#modal-create-sub-envelope").on('shown', function () {
      $(this).find("[autofocus]:first").focus();
    });
    $("#modal-create-sub-envelope").modal("toggle");
    $("#modal-create-sub-envelope").on("click", "#submit-sub-envelope", this.submitForm.bind(this)); 
    $(".save-sub-envelope-name, \
       .save-sub-envelope-balance, \
       .save-sub-envelope-expected-amount").keyup(function (event) {
      if(event.keyCode == 13) {
        $("#submit-sub-envelope").trigger("click");
      }
    });
  },
  
  submitForm: function () {
    var that = this;
    
    var name = $(".save-sub-envelope-name").val();
    var initialBalance = $(".save-sub-envelope-balance").val();
    var expectedAmount = $(".save-sub-envelope-expected-amount").val();
    var expectedTime = $("#submit-sub-envelope-expected-time").val();
    
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
      parent_env_id: this.parent_env_id,
      expected_amount: expectedAmount,
      expected_time: expectedTime
    }, {
      wait: true,
      success: function (model) {
        that.parentView.childCollection.add(model);
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

_.extend(BudgetApp.Views.ModalCreateNewSubEnvelope.prototype, helperMethods);