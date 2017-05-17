BudgetApp.Views.ModalMakeDeposit = Backbone.View.extend({
    
  template: JST['modals/modal_make_deposit'],
  
  events: {},
  
  initialize: function (options) {
    this.model = options.model
    this.$el = options.$el;
    this.makeDeposit();
  },  
  
  makeDeposit: function () {
    this.render();
    
    this.populateDatePicker();
    $("#modal-make-deposit").on('shown', function () {
      $(this).find("[autofocus]:first").focus();
    });
    $("#modal-make-deposit").modal("toggle");
    $("#modal-make-deposit").on("click", "#make-deposit", this.submitDeposit.bind(this));
    $(".deposit-amount, .deposit-note").keyup(function (event) {
      if(event.keyCode == 13) {
        $("#make-deposit").trigger("click");
      }
    });
  },
  
  populateDatePicker: function () {
    $("#make-deposit-date-selector").datepicker({
      autoclose: true
    });
    
    $("#make-deposit-date-selector").datepicker('setDate', new Date());
  },
  
  submitDeposit: function () {
    var amount = $(".deposit-amount").val();
    var note = $(".deposit-note").val();
    var date = $("#make-deposit-date-selector").datepicker('getDate');
  
    amount = BudgetApp.Models.Envelope.parseBalance(amount);
    this.model.depositBalance(amount, date, note);
    
    this.resetModal(this.$el);
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({  
    }));
    this.$el.html($renderedContent);
  },
})

_.extend(BudgetApp.Views.ModalMakeDeposit.prototype, helperMethods);