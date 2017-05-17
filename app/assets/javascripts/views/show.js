BudgetApp.Views.Show = Backbone.View.extend({
    
  template: JST['show'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    
    this.subViews = {};
  },
  
  createSubViews: function () {
    this.subViews['sideBarView'] = new BudgetApp.Views.SideBar({
      $el: $("#budget-side-bar")
    })
    
    this.subViews['tabsView'] = new BudgetApp.Views.Tabs({
      $el: $("#budget-tabs")
    });
  },
  
  //NOTE: it is important here that the tabsView gets rendered first!
  renderSubViews: function () {
    this.subViews['tabsView'].render();
    this.subViews['sideBarView'].render();
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({}));
    this.$el.html($renderedContent);
    
    this.createSubViews();
    this.renderSubViews();
  }
})