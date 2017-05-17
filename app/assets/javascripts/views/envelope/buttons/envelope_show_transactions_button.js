BudgetApp.Views.EnvelopeShowTransactionsButton = Backbone.View.extend({
    
  template: JST['envelope/buttons/envelope_show_transactions_button'],
  
  events: {
    "click .open-subenvelopes": "renderSubEnvelopes",
    "click .close-subenvelopes": "closeSubEnvelopes"
  },
  
  initialize: function (options) {
    this.model = options.model;
    this.$el = options.$el;
    this.parentView = options.parentView;
    
    this.subsShown = false;
    this.listenTo(this.parentView.collection, "remove", this.render)
    
    this.listenTo(this.parentView.collection, "add", this.renderWithSubs)

    this.render();
  },
  
  renderSubEnvelopes: function () {
    this.parentView.renderSubEnvelopes();
    var element = this.$el.find(".subs-icon");
    element.removeClass("icon-circle-arrow-down open-subenvelopes")
           .addClass("icon-circle-arrow-up close-subenvelopes");
    element.attr({title: "Hide sub envelopes"});
    this.subsShown = true;
  },
  
  closeSubEnvelopes: function () {
    this.parentView.closeSubEnvelopes();
    var element = this.$el.find(".subs-icon");
    element.removeClass("icon-circle-arrow-up close-subenvelopes")
           .addClass("icon-circle-arrow-down open-subenvelopes");
    element.attr({title: "Show sub envelopes"});
    this.subsShown = false;
  },
  
  render: function () {
    this.$el.find(".subs-icon").remove()
    var $renderedContent = $(this.template({
    }));
    
    this.$el.prepend($renderedContent);

    if (!this.model.hasChildren()) {
      var element = this.$el.find(".subs-icon");
      element.removeClass("icon-circle-arrow-up close-subenvelopes")
             .addClass("icon-circle-arrow-down disabled");
    } else
    
    if (!this.subsShown) {
      this.closeSubEnvelopes();
    } else if (this.subsShown) {
      this.closeSubEnvelopes();
      this.renderSubEnvelopes();
    };
  },
  
  renderWithSubs: function () {
    this.renderSubEnvelopes();
    this.render();
  }
})