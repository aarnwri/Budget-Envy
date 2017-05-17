BudgetApp.Views.TabProjections = Backbone.View.extend({
    
  template: JST['tabs/tab_projections'],  
    
  events: {
  },
  
  initialize: function (options) {
    this.$el = options.$el;
    this.render();
  },
  
  render: function () {
    var that = this;
    
    var $renderedContent = $(this.template({
    }));
    this.$el.html($renderedContent);
  }
})