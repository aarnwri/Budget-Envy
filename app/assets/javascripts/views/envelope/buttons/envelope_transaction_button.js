BudgetApp.Views.EnvelopeTransactionButton = Backbone.View.extend({
    
  template: JST['envelope/buttons/envelope_transaction_button'],
  
  events: {
    "click .envelope-deposit-button": "makeDeposit"
  },
  
  initialize: function (options) {
    this.$el = options.$el;
    this.model = options.model;

    this.render();
  },
  
  makeDeposit: function () {
    var newDepositView = new BudgetApp.Views.ModalMakeDeposit({
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