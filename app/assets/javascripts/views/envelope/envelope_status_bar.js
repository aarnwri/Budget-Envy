BudgetApp.Views.EnvelopeStatusBar = Backbone.View.extend({
    
  template: JST['envelope/envelope_status_bar'],
  
  events: {},
  
  initialize: function (options) {    
    this.$el = options.$el;
    this.model = options.model;

    this.listenTo(this.model, "change:balance", this.render);
    this.listenTo(this.model, "change:expected_amount", this.render);
  },
  
  colorizeProgressBar: function () {
    var progressBar = this.$(".progress");
    if (this.model.get("balance") < 0) {
      progressBar.addClass("progress-danger");
    } else if (this.model.calculateProgressBar() <= 33) {
      progressBar.addClass("progress-warning");
    } else {
      progressBar.addClass("progress-success");
    }
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
      envelope: this.model
    }));
    
    this.$el.html($renderedContent); 

    this.colorizeProgressBar();    
  } 
})