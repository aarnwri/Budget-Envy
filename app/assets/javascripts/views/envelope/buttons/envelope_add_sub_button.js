BudgetApp.Views.EnvelopeAddSubButton = Backbone.View.extend({
    
  template: JST['envelope/buttons/envelope_add_sub_button'],
  
  events: {
    "click .envelope-add-sub-button": "addSub"
  },
  
  initialize: function (options) {
    this.$el = options.$el;
    this.model = options.model;
    this.parentView = options.parentView;

    this.render();
  },
  
  addSub: function () {
    var newAddSubView = new BudgetApp.Views.ModalCreateNewSubEnvelope({
      $el: $("#my-modal"),
      model: this.model,
      parentView: this.parentView
    })
  },
  
  render: function () {
    this.$el.empty();
    
    var $renderedContent = $(this.template({
    }));
    this.$el.html($renderedContent);
  }
})