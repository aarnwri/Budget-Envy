BudgetApp.Views.SideBarButtonsGroupHistory = Backbone.View.extend({

  template: JST['side bar button groups/side_bar_buttons_group_history'],
  
  events: {},
  
  initialize: function (options) {
    this.$el = options.$el;
    
    this.subViews = {};
  },
  
  createSubViews: function () {
    this.subViews['historyFiveDaysButtonView'] = new BudgetApp.Views.HistoryFiveDaysButton({
      $el: $("#history-five-days-div")
    });
    
    this.subViews['historyTenDaysButtonView'] = new BudgetApp.Views.HistoryTenDaysButton({
      $el: $("#history-ten-days-div")
    });
    
    this.subViews['historyTwoWeeksButtonView'] = new BudgetApp.Views.HistoryTwoWeeksButton({
      $el: $("#history-two-weeks-div")
    });
    
    this.subViews['historyOneMonthButtonView'] = new BudgetApp.Views.HistoryOneMonthButton({
      $el: $("#history-one-month-div")
    });
    
    this.subViews['historyThreeMonthsButtonView'] = new BudgetApp.Views.HistoryThreeMonthsButton({
      $el: $("#history-three-months-div")
    });
    
    this.subViews['historySixMonthsButtonView'] = new BudgetApp.Views.HistorySixMonthsButton({
      $el: $("#history-six-months-div")
    });
    
    this.subViews['historyOneYearButtonView'] = new BudgetApp.Views.HistoryOneYearButton({
      $el: $("#history-one-year-div")
    });
    
    this.subViews['historyAllButtonView'] = new BudgetApp.Views.HistoryAllButton({
      $el: $("#history-all-div")
    });
  },
  
  renderSubViews: function () {
    this.subViews['historyFiveDaysButtonView'].render();
    this.subViews['historyTenDaysButtonView'].render();
    this.subViews['historyTwoWeeksButtonView'].render();
    this.subViews['historyOneMonthButtonView'].render();
    this.subViews['historyThreeMonthsButtonView'].render();
    this.subViews['historySixMonthsButtonView'].render();
    this.subViews['historyOneYearButtonView'].render();
    this.subViews['historyAllButtonView'].render();
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

