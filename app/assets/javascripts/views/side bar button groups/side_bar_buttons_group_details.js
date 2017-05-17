BudgetApp.Views.SideBarButtonsGroupDetails = Backbone.View.extend({
    
  template: JST['side bar button groups/side_bar_buttons_group_details'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    
    this.subViews = {};
  },
  
  createSubViews: function () {
    this.subViews['createNewParentEnvelopeButtonView'] = new BudgetApp.Views.CreateNewParentEnvelopeButton({
      $el: $("#create-new-parent-envelope-div")
    });
    
    this.subViews['showEnvelopeOrderButtonView'] = new BudgetApp.Views.ShowEnvelopeOrderButton({
      $el: $("#show-envelope-order-div")
    });
  },
  
  renderSubViews: function () {
    this.subViews['createNewParentEnvelopeButtonView'].render();
    this.subViews['showEnvelopeOrderButtonView'].render();
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({ 
    }));
    this.$el.html($renderedContent);
    
    this.createSubViews();
    this.renderSubViews();
  }
})

