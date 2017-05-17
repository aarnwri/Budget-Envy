BudgetApp.Views.SideBarButtonsGroupProjections = Backbone.View.extend({
    
  template: JST['side bar button groups/side_bar_buttons_group_projections'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    
    this.subViews = {};
  },
  
  createSubViews: function () {
    this.subViews['projectionsFiveDaysButtonView'] = new BudgetApp.Views.ProjectionsFiveDaysButton({
      $el: $("#projections-five-days-div")
    });
    
    this.subViews['projectionsTenDaysButtonView'] = new BudgetApp.Views.ProjectionsTenDaysButton({
      $el: $("#projections-ten-days-div")
    });
    
    this.subViews['projectionsTwoWeeksButtonView'] = new BudgetApp.Views.ProjectionsTwoWeeksButton({
      $el: $("#projections-two-weeks-div")
    });
    
    this.subViews['projectionsOneMonthButtonView'] = new BudgetApp.Views.ProjectionsOneMonthButton({
      $el: $("#projections-one-month-div")
    });
    
    this.subViews['projectionsThreeMonthsButtonView'] = new BudgetApp.Views.ProjectionsThreeMonthsButton({
      $el: $("#projections-three-months-div")
    });
    
    this.subViews['projectionsSixMonthsButtonView'] = new BudgetApp.Views.ProjectionsSixMonthsButton({
      $el: $("#projections-six-months-div")
    });
    
    this.subViews['projectionsOneYearButtonView'] = new BudgetApp.Views.ProjectionsOneYearButton({
      $el: $("#projections-one-year-div")
    });
    
    this.subViews['projectionsFiveYearsButtonView'] = new BudgetApp.Views.ProjectionsFiveYearsButton({
      $el: $("#projections-five-years-div")
    });
  },
  
  renderSubViews: function () {
    this.subViews['projectionsFiveDaysButtonView'].render();
    this.subViews['projectionsTenDaysButtonView'].render();
    this.subViews['projectionsTwoWeeksButtonView'].render();
    this.subViews['projectionsOneMonthButtonView'].render();
    this.subViews['projectionsThreeMonthsButtonView'].render();
    this.subViews['projectionsSixMonthsButtonView'].render();
    this.subViews['projectionsOneYearButtonView'].render();
    this.subViews['projectionsFiveYearsButtonView'].render();
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

  