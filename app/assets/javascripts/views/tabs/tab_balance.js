BudgetApp.Views.TabBalance = Backbone.View.extend({
    
  template: JST['tabs/tab_balance'],  
    
  events: {
  },
  
  initialize: function (options) {
    var that = this;
    
    this.$el = options.$el; 
    
    this.parentEnvelopeViews = {};
    
    this.listenTo(BudgetApp.user, "change:active_budget_id", this.render.bind(this));
    this.listenTo(BudgetApp.budgets, "sync", this.render.bind(this));
    this.listenTo(BudgetApp.parentEnvelopes, "add remove", this.render.bind(this));
  },
  
  createParentEnvelopeCollection: function () {
    this.collection = new BudgetApp.Collections.Envelopes(BudgetApp.envelopes.where({
      budget_id: BudgetApp.user.get("active_budget_id"),
      parent_env_id: null
    }));
  },
  
  createParentEnvelopeViews: function () {
    var that = this;
    
    this.collection.each(function (parentEnvelope) {
      that.parentEnvelopeViews[parentEnvelope.id] = new BudgetApp.Views.BalanceEnvelope({
        $el: that.$("#balance-tab-envelope-list"), 
        model: parentEnvelope,
        parentView: null
      });
    });
  },
  
  renderParentEnvelopeViews: function () {
    var that = this;
    
    this.collection.each(function (parentEnvelope) {
      that.parentEnvelopeViews[parentEnvelope.id].render();
    });
  },
  
  render: function () {
    this.$el.empty();
    
    this.createParentEnvelopeCollection();
    
    var $renderedContent = $(this.template({
    }));
    this.$el.html($renderedContent);

    this.createParentEnvelopeViews();
    this.renderParentEnvelopeViews();
  }
})