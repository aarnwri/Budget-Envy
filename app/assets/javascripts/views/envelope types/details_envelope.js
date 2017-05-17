BudgetApp.Views.DetailsEnvelope = Backbone.View.extend({
  
  template: JST['envelope types/details_envelope'],
  
  events: {},
  
  initialize: function (options) {
    var that = this;
    
    this.$el = options.$el;
    this.model = options.model;
    this.parentView = options.parentView;
        
    this.childCollection = this.model.createChildCollection();
  },
  
  createSubViews: function () {
    this.subViews = {};
    
    this.subViews['envelopeNameView'] = new BudgetApp.Views.EnvelopeName({
      $el: $("#details-envelope-name-" + this.model.id),
      model: this.model
    });
    
    this.subViews['envelopeBalanceView'] = new BudgetApp.Views.EnvelopeBalance({
      $el: $("#details-envelope-balance-" + this.model.id),
      model: this.model
    });
    
    this.subViews['envelopeButtonsView'] = new BudgetApp.Views.EnvelopeButtons({
      $el: $("#details-envelope-buttons-" + this.model.id),
      model: this.model,
      envelopeType: "details",
      parentView: this
    });
    
    this.subViews['envelopeStatusBarView'] = new BudgetApp.Views.EnvelopeStatusBar({
      $el: $("#details-envelope-status-bar-" + this.model.id),
      model: this.model
    });
  },
  
  renderSubViews: function () {
    this.subViews['envelopeNameView'].render();
    this.subViews['envelopeBalanceView'].render();
    this.subViews['envelopeButtonsView'].render();
    this.subViews['envelopeStatusBarView'].render();
  },
  
  createChildCollectionViews: function () {
    var that = this;
    
    this.childCollectionViews = {};
    this.childCollection.each(function(child) {
      that.childCollectionViews[child.id] = new BudgetApp.Views.DetailsEnvelope({
        $el: that.$('#details-envelope-' + that.model.id + '-subs'),
        model: child,
        parentView: that 
      });
    });
  },
  
  renderChildCollectionViews: function () {
    var that = this;
    this.childCollection.each(function(child) {
      that.childCollectionViews[child.id].render();
    });
  },
  
  renderSubEnvelopes: function () {
    this.createChildCollectionViews();
    this.renderChildCollectionViews();
  },
  
  closeSubEnvelopes: function () {
    this.$('#details-envelope-' + this.model.id + '-subs').empty();
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