BudgetApp.Views.BalanceEnvelope = Backbone.View.extend({
  
  template: JST['envelope types/balance_envelope'],
  
  events: {},
  
  initialize: function (options) {
    var that = this;
    
    this.$el = options.$el;
    this.model = options.model;
    this.parentView = options.parentView;
        
    this.childCollection = this.model.createChildCollection();
    
    this.listenTo(this.childCollection, "add remove", this.updateSubsStatusView);
  },
  
  createSubViews: function () {
    this.subViews = {};
    
    this.subViews['envelopeNameView'] = new BudgetApp.Views.EnvelopeName({
      $el: $("#balance-envelope-name-" + this.model.id),
      model: this.model
    });
    
    this.subViews['envelopeBalanceView'] = new BudgetApp.Views.EnvelopeBalance({
      $el: $("#balance-envelope-balance-" + this.model.id),
      model: this.model
    });
    
    this.subViews['envelopeButtonsView'] = new BudgetApp.Views.EnvelopeButtons({
      $el: $("#balance-envelope-buttons-" + this.model.id),
      model: this.model,
      envelopeType: "balance",
      parentView: this
    });
    
    this.subViews['envelopeStatusBarView'] = new BudgetApp.Views.EnvelopeStatusBar({
      $el: $("#balance-envelope-status-bar-" + this.model.id),
      model: this.model
    });
    
    this.subViews['envelopeSubsStatusView'] = new BudgetApp.Views.EnvelopeSubsStatus({
      $el: $("#balance-envelope-subs-status-" + this.model.id),
      model: this.model,
      parentView: this
    });
  },
  
  renderSubViews: function () {
    this.subViews['envelopeNameView'].render();
    this.subViews['envelopeBalanceView'].render();
    this.subViews['envelopeButtonsView'].render();
    this.subViews['envelopeStatusBarView'].render();
    this.subViews['envelopeSubsStatusView'].render();
  },
  
  updateSubsStatusView: function () {
    this.subViews['envelopeSubsStatusView'].render();
  },
  
  createChildCollectionViews: function () {
    var that = this;
    
    this.childCollectionViews = {};
    this.childCollection.each(function (child) {
      that.childCollectionViews[child.id] = new BudgetApp.Views.BalanceEnvelope({
        $el: that.$('#balance-envelope-' + that.model.id + '-subs'),
        model: child,
        parentView: that 
      });
    });
  },
  
  renderChildCollectionViews: function () {
    var that = this;
    this.childCollection.each(function (child) {
      that.childCollectionViews[child.id].render();
    });
  },
  
  renderSubEnvelopes: function () {
    this.createChildCollectionViews();
    this.renderChildCollectionViews();
  },
  
  closeSubEnvelopes: function () {
    this.$('#balance-envelope-' + this.model.id + '-subs').empty();
  },
  
  render: function () {    
    var $renderedContent = $(this.template({
      envelope: this.model
    }));
    
    this.$el.append($renderedContent);
    
    this.createSubViews();
    this.renderSubViews(); 
  }
})