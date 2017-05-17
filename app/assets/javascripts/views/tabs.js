BudgetApp.Views.Tabs = Backbone.View.extend({
    
  template: JST['tabs'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;

    this.tabViews = {};
  },
  
  createTabViews: function () {
    this.tabViews['balance'] = new BudgetApp.Views.TabBalance({
      $el: $("#balance")
    });
    
    this.tabViews['details'] = new BudgetApp.Views.TabDetails({
      $el: $("#details")
    });
    
    this.tabViews['bills'] = new BudgetApp.Views.TabBills({
      $el: $("#bills")
    });
    
    this.tabViews['history'] = new BudgetApp.Views.TabHistory({
      $el: $("#history")
    });
    
    this.tabViews['projections'] = new BudgetApp.Views.TabProjections({
      $el: $("#projections")
    });
    
    this.tabViews['accounts'] = new BudgetApp.Views.TabAccounts({
      $el: $("#accounts")
    });
  },
  
  renderTabViews: function () {
    this.tabViews['balance'].render();
    this.tabViews['details'].render();
    this.tabViews['bills'].render();
    this.tabViews['history'].render();
    this.tabViews['projections'].render();
    this.tabViews['accounts'].render();    
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({ 
    }));
    this.$el.html($renderedContent);
    
    this.createTabViews();
    this.renderTabViews();
  }
})