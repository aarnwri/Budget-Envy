BudgetApp.Views.ModalParseReceipt = Backbone.View.extend({
    
  template: JST['modals/modal_parse_receipt'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    
    //TODO: set up tax rate to use previously used values by default
    this.taxRate = options.taxRate || 0.08;
    
    this.envelopeSelectors = [];
    this.itemListLengths = [];
    this.initialEnvelopeOptions = [];
    this.selectedEnvelopes = []
    
    this.populateInitialEnvelopeOptions();
    
    this.envelopesAdded = 0;
    
    this.parseReceipt();
  },
  
  parseReceipt: function () {
    var that = this;
    
    this.render();
    
    this.populateDatePicker();
    this.populateInitialEnvelopeSelectors();
    
    $("#modal-parse-receipt").on('shown', function () {
      $(this).find("[autofocus]:first").focus();
    });
    $("#modal-parse-receipt").modal("toggle");
    $("#modal-parse-receipt").on("click", "#parse-receipt-submit", this.submitReceipt.bind(this));
    $("#modal-parse-receipt").on("click", "#parse-receipt-add-envelope", this.addEnvelope.bind(this));
  },
  
  populateDatePicker: function () {
    $("#parse-receipt-date-selector").datepicker({
      autoclose: true
    });
    
    $("#parse-receipt-date-selector").datepicker('setDate', new Date());
  },
  
  populateInitialEnvelopeSelectors: function () {
    this.addEnvelope();
    this.addEnvelope();
  },
  
  populateInitialEnvelopeOptions: function () {
    var that = this;
    
    var envelopeList = BudgetApp.envelopes.where({
      budget_id: BudgetApp.user.get("active_budget_id")
    });
    
    _.each(envelopeList, function (envelope) {
      that.initialEnvelopeOptions.push(envelope.id);
    });
  },
  
  updateSelectedEnvelopes: function () {
    var that = this;
    
    this.selectedEnvelopes = [];
    
    _.each(this.envelopeSelectors, function ($envelopeSelector) {
      var selectedOption = $envelopeSelector.val();
      if (selectedOption) {
        that.selectedEnvelopes.push(parseInt(selectedOption));
      }
    });
  },
  
  updateEnvelopeSelectors: function () {
    var that = this;
    
    var currentEnvelopeOptions = this.getCurrentEnvelopeOptions();
    
    _.each(this.envelopeSelectors, function ($envelopeSelector) {
      var selectedOptionId = $envelopeSelector.val();
      
      $envelopeSelector.empty();
      if (!selectedOptionId) {
        // no option selected so add a blank option back
        var option = "<option></option>";
        $envelopeSelector.append(option);
      } else {
        // add selected option back to selector
        var envelope = BudgetApp.envelopes.get(selectedOptionId);
        var option = "<option value=" + selectedOptionId + ">" + envelope.getFullPath() + "</option>";
        $envelopeSelector.append(option);
      }
      
      _.each(currentEnvelopeOptions, function (envelopeOption) {
        var envelope = BudgetApp.envelopes.get(envelopeOption);
        var option = "<option value=" + envelopeOption + ">" + envelope.getFullPath() + "</option>";
        $envelopeSelector.append(option);
      });
    });
  },
  
  setEnvelopeSelectorListeners: function () {
    var that = this;
    
    this.removeEnvelopeSelectorListeners();
    
    _.each(this.envelopeSelectors, function ($envelopeSelector, idx) {
      $envelopeSelector.on("change", function () {
        $("#envelope-" + (idx + 1) + "-item-1-amount").focus();
        
        that.updateSelectedEnvelopes();
        that.updateEnvelopeSelectors();
      });
    });
  },
  
  removeEnvelopeSelectorListeners: function () {
    _.each(this.envelopeSelectors, function ($envelopeSelector) {
      $envelopeSelector.off("change");
    });
  },
  
  addEnvelope: function () {
    var that = this;
    
    var num = this.envelopesAdded += 1;
    
    var html = JST['modals/helpers/parse_receipt_envelope']({ num: this.envelopesAdded });
    $("#parse-receipt-envelope-list").append(html);
    
    this.itemListLengths.push(0);
    
    var $envelopeSelectorAdded = $("#envelope-" + (this.envelopesAdded) + "-selector");
    this.envelopeSelectors.push($envelopeSelectorAdded);
    
    this.updateEnvelopeSelectors();
    this.setEnvelopeSelectorListeners();
    
    this.addItem(num);
    
    $envelopeSelectorAdded.focus();
    
    $("#add-item-envelope-" + this.envelopesAdded).on("click", function () {
      that.addItem(num);
    });
  },
  
  addItem: function (envNum) {
    var that = this;
    
    var itNum = this.itemListLengths[envNum - 1] += 1;
    
    var html = JST['modals/helpers/parse_receipt_item']({ envNum: envNum, itNum: itNum })
    $("#envelope-" + envNum + "-item-list").append(html);
    
    var $itemAddedAmount = $("#envelope-" + envNum + "-item-" + itNum + "-amount");
    var $itemAddedTax = $("#envelope-" + envNum + "-item-" + itNum + "-tax");
    var $taxInput = $("#parse-receipt-tax-rate");
    
    $itemAddedAmount.focus();
    
    $itemAddedAmount.on("keyup", function () {
      that.updateEnvelopeTotal(envNum);
    });
    $itemAddedTax.on("change", function () {
      that.updateEnvelopeTotal(envNum);
    });
    $taxInput.on("keyup", function () {
      that.updateTaxRate();
      that.updateEnvelopeTotal(envNum);
    });
  },
  
  updateTaxRate: function () {
    var taxRate = $("#parse-receipt-tax-rate").val();
    
    this.taxRate = parseFloat(taxRate) / 100;
  },
  
  formatTaxRate: function () {
    return accounting.toFixed(this.taxRate * 100);
  },
  
  updateEnvelopeTotal: function (envNum) {
    var that = this;
    
    var total = 0;
    $("#envelope-" + envNum + "-item-list").find("input[type=text]").each(function (idx, el) {
      var centsBalance = BudgetApp.Models.Envelope.parseBalance(el.value);
      var elIsTaxed = $("#" + el.id.replace("amount", "tax")).is(":checked");
      
      if (elIsTaxed) {
        total += BudgetApp.Models.Envelope.addTax(centsBalance, that.taxRate);
      } else {
        total += centsBalance;
      }
    });
    $("#envelope-" + envNum + "-total").val(BudgetApp.Models.Envelope.formatAmount(total));
    
    that.updateReceiptTotal();
  },
  
  updateReceiptTotal: function () {
    var that = this;
    
    var total = 0;
    $("#parse-receipt-envelope-list").find("input:disabled").each(function (idx, el) {
      var centsBalance = BudgetApp.Models.Envelope.parseBalance(el.value);
      
      total += centsBalance;
    });
    
    $("#parse-receipt-total").val(BudgetApp.Models.Envelope.formatAmount(total));
  },
  
  submitReceipt: function () {
    var to = $("#parse-receipt-paid-to").val();
    var note = $("#parse-receipt-note").val();
    var paymentType = $("#parse-receipt-payment-type").val();
    var date = $("#parse-receipt-date-selector").datepicker('getDate');
    
    _.each(this.envelopeSelectors, function ($envelopeSelector, idx) {
      var envelope = BudgetApp.envelopes.get($envelopeSelector.val());
      var amountInput = $("#envelope-" + (idx + 1) + "-total").val();
      var amount = BudgetApp.Models.Envelope.parseBalance(amountInput);
      
      if (envelope) {
        envelope.withdrawBalance(amount, to, note, paymentType, date);
      }
    });
    
    this.resetModal(this.$el);
  },
  
  getCurrentEnvelopeOptions: function () {
    return _.difference(this.initialEnvelopeOptions, this.selectedEnvelopes);
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
      taxRate: this.formatTaxRate()
    }));
    this.$el.html($renderedContent);
  }
});

_.extend(BudgetApp.Views.ModalParseReceipt.prototype, helperMethods);