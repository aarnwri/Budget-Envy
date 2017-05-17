BudgetApp.Views.ModalMakeWithdrawal = Backbone.View.extend({
    
  template: JST['modals/modal_make_withdrawal'],
  
  events: {},
  
  initialize: function (options) {
    this.model = options.model
    this.$el = options.$el;
    this.makeWithdrawal();
  },
  
  makeWithdrawal: function () {
    this.render();
    
    this.populateDatePicker();
    $("#modal-make-withdrawal").on('shown', function () {
      $(this).find("[autofocus]:first").focus();
    });
    $("#modal-make-withdrawal").modal("toggle");
    $("#modal-make-withdrawal").on("click", "#make-withdrawal", this.submitWithdrawal.bind(this));
    $(".withdrawal-amount, .withdrawal-to, .withdrawal-note, .withdrawal-payment-type").keyup(function (event) {
      if(event.keyCode == 13) {
        $("#make-withdrawal").trigger("click");
      }
    });
  },
  
  populateDatePicker: function () {
    $("#make-withdrawal-date-selector").datepicker({
      autoclose: true
    });
    
    $("#make-withdrawal-date-selector").datepicker('setDate', new Date());
  },
  
  submitWithdrawal: function () {
    var amount = $(".withdrawal-amount").val();
    var to = $(".withdrawal-to").val();
    var note = $(".withdrawal-note").val();
    var paymentType = $(".withdrawal-payment-type").val();
    var date = $("#make-withdrawal-date-selector").datepicker('getDate');
    
    amount = BudgetApp.Models.Envelope.parseBalance(amount);
    
    this.model.withdrawBalance(amount, to, note, paymentType, date);
        
    this.resetModal(this.$el);
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({ 
    }));
    this.$el.html($renderedContent);
  }
})

_.extend(BudgetApp.Views.ModalMakeWithdrawal.prototype, helperMethods);