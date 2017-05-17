BudgetApp.Views.SideBar = Backbone.View.extend({
    
  template: JST['side_bar'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    
    this.subViews = {};
  },
  
  createSubViews: function () {
    this.subViews['sideBarConstantsView'] = new BudgetApp.Views.SideBarConstants({
      $el: $("#side-bar-constants")
    })
    
    this.subViews['sideBarVariablesView'] = new BudgetApp.Views.SideBarVariables({
      $el: $("#side-bar-variables")
    });
  },
  
  renderSubViews: function () {
    this.subViews['sideBarConstantsView'].render();
    this.subViews['sideBarVariablesView'].render();
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({}));
    this.$el.html($renderedContent);
    
    this.createSubViews();
    this.renderSubViews();
  }
})