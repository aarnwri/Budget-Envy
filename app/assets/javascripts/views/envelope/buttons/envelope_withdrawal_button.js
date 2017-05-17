BudgetApp.Views.EnvelopeWithdrawalButton = Backbone.View.extend({
    
  template: JST['envelope/buttons/envelope_withdrawal_button'],
  
  events: {
    "click .envelope-withdrawal-button": "makeWithdrawal"
  },
  
  initialize: function (options) {
    this.$el = options.$el;
    this.model = options.model;

    this.render();
  },
  
  makeWithdrawal: function () {
    var newWithdrawalView = new BudgetApp.Views.ModalMakeWithdrawal({
      $el: $("#my-modal"),
      model: this.model
    })
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
    }));
    this.$el.html($renderedContent);
  }
})