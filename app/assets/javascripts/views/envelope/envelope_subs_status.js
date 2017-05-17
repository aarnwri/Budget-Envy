BudgetApp.Views.EnvelopeSubsStatus = Backbone.View.extend({
    
  template: JST['envelope/envelope_subs_status'],
  
  events: {},
  
  initialize: function (options) {    
    this.$el = options.$el;
    this.model = options.model;
    this.parentView = options.parentView;

    if (this.model.hasParent()) {
      this.listenTo(this.model, "change:balance", this.parentView.updateSubsStatusView.bind(this.parentView));
      this.listenTo(this.model, "change:expected_amount", this.parentView.updateSubsStatusView.bind(this.parentView));
    }
  },
  
  colorizeProgressBar: function () {
    var progressBar = this.$(".progress");
    if (this.model.subsTotalBalance() < 0) {
      progressBar.addClass("progress-danger");
    } else if (this.model.calculateSubsTotalProgressBar() <= 33) {
      progressBar.addClass("progress-warning");
    } else {
      progressBar.addClass("progress-success");
    }
  },
  
  render: function () {
    this.$el.empty();
    
    if (this.model.hasChildren()) {
      var $renderedContent = $(this.template({
        envelope: this.model
      }));
      
      this.$el.html($renderedContent); 

      this.colorizeProgressBar();    
    }
  } 
})