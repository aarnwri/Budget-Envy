BudgetApp.Views.EnvelopeButtons = Backbone.View.extend({
    
  template: JST['envelope/envelope_buttons'],
  
  events: {},
  
  initialize: function (options) {    
    this.$el = options.$el;
    this.model = options.model;
    this.envelopeType = options.envelopeType;
    this.parentView = options.parentView;
    
    this.subViews = {};
  },
  
  createSubViews: function () {
    switch(this.envelopeType) {
    case "balance":
      this.subViews['envelopeShowSubsButtonView'] = new BudgetApp.Views.EnvelopeShowSubsButton({
        $el: this.$('#envelope-show-subs-' + this.model.id),
        model: this.model,
        parentView: this.parentView
      });
      this.subViews['envelopeDepositButtonView'] = new BudgetApp.Views.EnvelopeDepositButton({
        $el: this.$('#envelope-deposit-' + this.model.id),
        model: this.model
      });
      this.subViews['envelopeWithdrawalButtonView'] = new BudgetApp.Views.EnvelopeWithdrawalButton({
        $el: this.$('#envelope-withdrawal-' + this.model.id),
        model: this.model
      });
      break;
    case "details":
      this.subViews['envelopeShowSubsButtonView'] = new BudgetApp.Views.EnvelopeShowSubsButton({
        $el: this.$('#envelope-show-subs-' + this.model.id),
        model: this.model,
        parentView: this.parentView
      });
      this.subViews['envelopeAddSubButtonView'] = new BudgetApp.Views.EnvelopeAddSubButton({
        $el: this.$('#envelope-add-sub-' + this.model.id),
        model: this.model,
        parentView: this.parentView
      });
      this.subViews['envelopeRemoveButtonView'] = new BudgetApp.Views.EnvelopeRemoveButton({
        $el: this.$('#envelope-remove-' + this.model.id),
        model: this.model,
        parentView: this.parentView
      });
      this.subViews['envelopeEditButtonView'] = new BudgetApp.Views.EnvelopeEditButton({
        $el: this.$('#envelope-edit-' + this.model.id),
        model: this.model
      });
      break;
    case "history":
      this.subViews['envelopeShowSubsButtonView'] = new BudgetApp.Views.EnvelopeShowSubsButton({
        $el: this.$('#envelope-show-subs-' + this.model.id),
        model: this.model,
        parentView: this.parentView
      });
      this.subViews['showTransactionsButtonView'] = new BudgetApp.Views.EnvelopeShowTransactionsButton({
        $el: this.$('#envelope-show-transactions-' + this.model.id)
      });
      break;
    case "projected":
      this.subViews['envelopeShowSubsButtonView'] = new BudgetApp.Views.EnvelopeShowSubsButton({
        $el: this.$('#envelope-show-subs-' + this.model.id),
        model: this.model,
        parentView: this.parentView
      });
      break;
    default:
      alert("There has been an error: no case matches in EnvelopeButtons createSubViews function");
    }
  },
  
  renderSubViews: function () {
    for (var view in this.subViews) {
      if (this.subViews.hasOwnProperty(view)) {
        this.subViews[view].render();
      }
    }
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
      envelope: this.model
    }));
    
    this.$el.html($renderedContent);
    
    this.createSubViews();
    this.renderSubViews();
  }
})