BudgetApp.Views.ParseReceiptButton = Backbone.View.extend({
  
  template: JST['side bar buttons/parse_receipt_button'],
  
  events: {
    "click #parse-receipt-button": "parseReceipt"
  },
  
  initialize: function (options) {
    this.$el = options.$el;
  },
  
  parseReceipt: function () {
    var newModalParseReceiptView = new BudgetApp.Views.ModalParseReceipt({
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