BudgetApp.Views.ModalEditEnvelope = Backbone.View.extend({
    
  template: JST['modals/modal_edit_envelope'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    this.model = options.model
    this.editEnvelope();
  },
  
  editEnvelope: function () {
    var that = this;
    
    this.collection = new BudgetApp.Collections.Envelopes(BudgetApp.envelopes.where({
      budget_id: BudgetApp.user.get("active_budget_id"),
      parent_env_id: null
    }));
    this.render();
    $("#modal-edit-envelope").on('shown', function () {
      $(this).find("[autofocus]:first").focus();
    });
    $("#modal-edit-envelope").modal("toggle");
    $("#modal-edit-envelope").on("click", "#submit-edits", this.submitForm.bind(this)); 
    $(".save-edit-envelope-name, .save-edit-envelope-expected-amount, .save-edit-envelope-expected-time").keyup(function(event) {
      if(event.keyCode == 13) {
        $("#submit-edits").trigger("click");
      }
    });
  },
  
  submitForm: function () {
    var that = this;
    
    var name = $(".save-edit-envelope-name").val();
    var expectedAmount = $(".save-edit-envelope-expected-amount").val();
    var expectedTime = $(".save-edit-envelope-expected-time").val();
    
    expectedAmount = BudgetApp.Models.Envelope.parseBalance(expectedAmount);
    
    var parentEnvelopeNames = this.collection.pluck("name");
    if (name != this.model.get("name")) {
      if (_.contains(parentEnvelopeNames, name)) {
        alert("Envelopes on the same level should have unique names. Please choose another.");
        this.editEnvelope();
      };
    };
   
    
    this.model.set({
      name: name,
      expected_amount: expectedAmount,
      expected_time: expectedTime
    });
    this.model.save();
  },
  
  selectPreviouslySelectedTimeFrame: function () {
    this.$("[value=" + this.model.get("expected_time") + "]").attr("selected", "true");
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
      envelope: this.model
    }));
    this.$el.html($renderedContent);
    
    this.selectPreviouslySelectedTimeFrame();
  },
})

_.extend(BudgetApp.Views.ModalCreateNewParentEnvelope.prototype, helperMethods);