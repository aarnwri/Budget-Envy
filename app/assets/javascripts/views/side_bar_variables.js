BudgetApp.Views.SideBarVariables = Backbone.View.extend({
    
  template: JST['side_bar_variables'],
  
  events: {},
  
  initialize: function (options) {
    var that = this
    this.$el = options.$el;
    
    this.subViews = {};
    this.currentTab = $("div#myTabContent div.active").attr("id")

    $('a[data-toggle="tab"]').on('shown', function(event) {
      that.currentTab = $("div#myTabContent div.active").attr("id");
      that.renderButtonGroup();
    });
  },
  
  createSubViews: function () {
    this.subViews = {
      sideBarButtonsGroupBalanceView: new BudgetApp.Views.SideBarButtonsGroupBalance({
        $el: $("#side-bar-buttons-groups")
      }),
      sideBarButtonsGroupDetailsView: new BudgetApp.Views.SideBarButtonsGroupDetails({
        $el: $("#side-bar-buttons-groups")
      }),
      sideBarButtonsGroupBillsView: new BudgetApp.Views.SideBarButtonsGroupBills({
        $el: $("#side-bar-buttons-groups")
      }),
      sideBarButtonsGroupHistoryView: new BudgetApp.Views.SideBarButtonsGroupHistory({
        $el: $("#side-bar-buttons-groups")
      }),
      sideBarButtonsGroupProjectionsView: new BudgetApp.Views.SideBarButtonsGroupProjections({
        $el: $("#side-bar-buttons-groups")
      }),
      sideBarButtonsGroupAccountsView: new BudgetApp.Views.SideBarButtonsGroupAccounts({
        $el: $("#side-bar-buttons-groups")
      }) 
    };
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({ 
    }));
    this.$el.html($renderedContent);

    this.createSubViews();
    this.renderButtonGroup();
  },
  
  renderButtonGroup: function () {
    switch(this.currentTab) {
    case "balance":
      this.subViews['sideBarButtonsGroupBalanceView'].render();
      break;
    case "details":
      this.subViews['sideBarButtonsGroupDetailsView'].render();
      break;
    case "bills":
      this.subViews['sideBarButtonsGroupBillsView'].render();
      break;
    case "history":
      this.subViews['sideBarButtonsGroupHistoryView'].render();
      break;
    case "projections":
      this.subViews['sideBarButtonsGroupProjectionsView'].render();
      break;
    case "accounts":
      this.subViews['sideBarButtonsGroupAccountsView'].render(); 
      break;
    default:
      alert("There has been an error: no case matches in side_bar_variables render function");
    }
  }
})

