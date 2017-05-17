BudgetApp.Models.Envelope = Backbone.Model.extend({
  
  hasChildren: function () {
    return BudgetApp.envelopes.findWhere({parent_env_id: this.id});
  },
  
  getChildren: function () {
    return BudgetApp.envelopes.where({parent_env_id: this.id}); 
  },
  
  createChildCollection: function () {
    var childCollection = new BudgetApp.Collections.Envelopes(this.getChildren());
    BudgetApp.subEnvelopeCollections[this.id] ||
      (BudgetApp.subEnvelopeCollections[this.id] = childCollection);
    return BudgetApp.subEnvelopeCollections[this.id];
  },
  
  removeChildren: function () {
    children = this.getChildren();
    _.each(children, function (child) {
      child.removeChildren();
      child.destroy();
    });
  },
  
  hasParent: function () {
    if (this.get("parent_env_id") != null) {
      return true;
    } else {
      return false;
    }
  },
  
  getParentEnvelope: function () {
    if (this.hasParent()) {
      return parentEnvelope = BudgetApp.envelopes.get(this.get("parent_env_id"));
    } else {
      return false
    }
  },
  
  getFullPath: function () {
    if (this.hasParent()) {
      return this.getParentEnvelope().getFullPath() + "/" + this.get("name");
    } else {
      return this.get("name");
    }
  },
  
  calculateProgressBar: function () {
    var expected_amount = this.get("expected_amount");
    var balance = this.get("balance");
    return BudgetApp.Models.Envelope.calculateProgressBarPercentage(expected_amount, balance);
  },
  
  calculateSubsTotalProgressBar: function () {
    var subsTotalExpectedAmount = this.subsTotalExpectedAmount();
    var subsTotalBalance = this.subsTotalBalance();
    
    return BudgetApp.Models.Envelope.calculateProgressBarPercentage(subsTotalExpectedAmount, subsTotalBalance);
  },
  
  formatProgressBar: function () {
    return this.calculateProgressBar().toString() + "%";
  },
  
  formatSubsTotalProgressBar: function () {
    return this.calculateSubsTotalProgressBar().toString() + "%";
  },
  
  subsTotalExpectedAmount: function () {
    var total = 0;
    var childEnvelopes = this.getChildren();
    _.each(childEnvelopes, function (envelope) {
      total += envelope.get("expected_amount");
      total += envelope.subsTotalExpectedAmount();
    });
    return total;
  },
  
  subsTotalBalance: function () {
    var total = 0;
    var childEnvelopes = this.getChildren();
    _.each(childEnvelopes, function (envelope) {
      total += envelope.get("balance");
      total += envelope.subsTotalBalance();
    });
    return total;
  },
  
  formatSubsTotalExpectedAmount: function () {
    return this.formatAmount(this.subsTotalExpectedAmount());
  },
  
  formatSubsTotalBalance: function () {
    return this.formatAmount(this.subsTotalBalance());
  },
  
  formatAmount: function (amount) {
    return accounting.formatMoney(accounting.toFixed(amount/100, 2));
  },
  
  formatBalance: function () {
    var balance = this.get("balance");
    return this.formatAmount(balance);
  },
  
  formatExpectedAmount: function () {
    var expectedAmount = this.get("expected_amount");
    return this.formatAmount(expectedAmount);
  },
  
  parseBalance: function (balance) {
    var decimalBalance = accounting.unformat(balance);
    var roundedBalance = accounting.unformat(accounting.toFixed(decimalBalance, 2));
    var centsBalance = roundedBalance * 100;
    return centsBalance;
  },
  
  depositBalance: function (amount, date, note) {
    var that = this;
    
    var oldBalance = this.get("balance")
    var newBalance = oldBalance + amount;
    
    if (note == "") {
      note = null
    }
    
    BudgetApp.transactions.create({
      envelope_id: this.id,
      old_balance: oldBalance,
      amount: amount,
      new_balance: newBalance,
      transaction_type: "deposit",
      transaction_date: date,
      memo: note
    }, {
      success: function () {
        that.set("balance", newBalance);
        that.save();
      }
    });
    
    return true;
  },
  
  withdrawBalance: function (amount, to, note, paymentType, date) {
    var that = this;
    
    var oldBalance = this.get("balance")
    var newBalance = oldBalance - amount;
    var amountOpposite = accounting.toFixed(amount * (-1), 2)
    
    if (to == "") {
      to = null
    }
    if (note == "") {
      note = null
    }
    if (paymentType == "") {
      paymentType = null
    }
    
    BudgetApp.transactions.create({
      envelope_id: this.id,
      old_balance: oldBalance,
      amount: amountOpposite,
      new_balance: newBalance,
      transaction_type: "withdrawal",
      transaction_date: date,
      to: to,
      memo: note,
      payment_type: paymentType
    }, {
      success: function () {
        that.set("balance", newBalance);
        that.save();
      }
    });
    
    return true;
  }
});

BudgetApp.Models.Envelope.parseBalance = function (balance) {
  var decimalBalance = accounting.unformat(balance);
  var roundedBalance = accounting.unformat(accounting.toFixed(decimalBalance, 2));
  var centsBalance = roundedBalance * 100;
  return centsBalance;
};

BudgetApp.Models.Envelope.addTax = function (centsBalance, taxRate) {
  return centsBalance + accounting.unformat(accounting.toFixed(centsBalance * taxRate));
};

BudgetApp.Models.Envelope.formatAmount = function (amount) {
  return accounting.formatMoney(accounting.toFixed(amount/100, 2));
};

BudgetApp.Models.Envelope.calculateProgressBarPercentage = function (expected_amount, balance) {
  if ((expected_amount === 0) || (expected_amount === null)) {
    if (balance === 0) {
      return 0;
    } else {
      return 100;
    }
  } else {
    var decimal = Math.abs(balance) / expected_amount
    return decimal.toFixed(2) * 100
  }
}