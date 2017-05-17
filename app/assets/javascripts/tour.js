$(document).ready(function () {
  if (window.location.pathname !== "/main") return;
    
  var user = BudgetApp.user;
  if (!user.get("guest_flag")) return;
  
  var hidden = "<div style\"=display: hidden;\"></div>";
  
  var disableNextButton = function () {
    $("button[data-role='next']").addClass("disabled").css("outline", "none");
  };
  
  var disablePrevButton = function () {
    $("button[data-role='prev']").addClass("disabled");
  };
  
  var hideModal = function (modalSelector) {
    $(modalSelector).modal("hide");
  }
  
  var delay = {
    title: "DELAY",
    element: "body",
    template: hidden,
    duration: 500
  }
  
  var tour = new Tour({
    storage: false,
    debug: false,
    keyboard: false,
    steps: [
      {
        title: "Welcome!",
        content: "<p>This tour will take you through some key features to help you get \
                  started.</p> Click 'next' to continue.",
        orphan: true,
        backdrop: true,
        currentStep: 0
      },
      {
        title: "Budget Selector",
        element: "#budget-list",
        placement: "bottom",
        content: "<p>This selector shows you which budget is currently being shown.</p> \
                  <p>An example budget named 'Home' has already been created for you. \
                  Feel free to play around with it after the tour.</p> Click 'next' to \
                  continue.",
        currentStep: 1
      },
      {
        title: "Create a New Budget",
        element: "#create-new-budget-button",
        content: "<p>Okay! Let's get started by creating a new budget.</p> Click \
                  the 'Create New Budget' button.",
        reflex: true,
        onShown: function (tour) {
          disableNextButton();
        },
        currentStep: 2
      },
      delay,
      {
        title: "Name the Budget",
        element: ".save-budget-name",
        placement: "bottom",
        content: "<p>Let's give it the name 'Work' since there is already a 'Home' \
                  budget.</p> Then hit enter or click 'Ok' to continue.",
        prev: 2,
        onPrev: function (tour) {
          hideModal("#modal-create-budget");
        },
        onShown: function (tour) {
          disableNextButton();
          $("#submit-budget").one("click", function () {
            if ($(".save-budget-name").val() !== "") {
              tour.next();
            } else {
              alert("The budget name can't be empty... Let's try that again...");
              window.setTimeout(function () {
                hideModal("#modal-create-budget");
              }, 500);
              tour.prev();
            }
          });
        },
        currentStep: 4
      },
      {
        title: "Removing a Budget",
        element: "#remove-selected-budget-button",
        content: "<p>You can remove the currently selected budget with this button. \
                  We won't demonstrate that right now, so be careful!</p> Click 'next' \
                  to continue.",
        prev: 3,
        onPrev: function (tour) {
          $("#create-new-budget-button").trigger("click");
        },
        next: 7,
        currentStep: 5
      },
      delay,
      {
        title: "Tabs",
        element: "a[href='#details']",
        placement: "bottom",
        content: "<p>Each of these tabs shows different information concerning the current \
                  budget. We will go through some of the particulars later.</p> For now, \
                  go ahead and click on the 'Details' tab so that we can add some \
                  envelopes.",
        prev: 5,
        reflex: true,
        onShown: function (tour) {
          disableNextButton();
        },
        currentStep: 7
      },
      delay,
      {
        title: "Add 'Rent' Envelope",
        element: "#create-new-parent-envelope-button",
        content: "Now we need some envelopes. Click the 'Create New Envelope' \
                  button to add an envelope to the currently selected budget.",
        reflex: true,
        prev: 6,
        onPrev: function (tour) {
          $("a[href='#balance']").trigger("click");
        },
        onShown: function (tour) {
          disableNextButton();
          $("#create-new-parent-envelope-button").one("remove", function () {
            tour.goTo(7);
          });
        },
        onHidden: function (tour) {
          $("#create-new-parent-envelope-button").off("remove");
        },
        currentStep: 9
      },
      delay,
      {
        title: "Envelope Name",
        element: ".save-parent-envelope-name",
        content: "<p>Let's call this envelope 'Rent'.</p> Then hit 'tab' or click \
                  'next' to continue.",
        prev: 9,
        onPrev: function (tour) {
          hideModal("#modal-create-create-new-parent-envelope");
        },
        onShown: function (tour) {
          $(".save-parent-envelope-balance").off("focus");
          $(".save-parent-envelope-expected-amount").off("focus");
          $(".save-parent-envelope-expected-time").off("focus");
          $(".save-parent-envelope-balance").one("focus", function () {
            tour.next();
          });
          $(".save-parent-envelope-expected-amount").one("focus", function () {
            tour.goTo(13);
          });
          $(".save-parent-envelope-expected-time").one("focus", function () {
            tour.goTo(14);
          });
        },
        onNext: function (tour) {
          $(".save-parent-envelope-balance").off("focus");
          $(".save-parent-envelope-balance").focus();
        },
        currentStep: 11
      },
      {
        title: "Envelope Initial Balance",
        element: ".save-parent-envelope-balance",
        content: "<p>This is the amount that you want the envelope start with... Let's \
                  say we have 3 month's rent saved up, so put in $1500.</p> Then hit 'tab' \
                  or click 'next' to continue.",
        onPrev: function (tour) {
          $(".save-parent-envelope-name").off("focus");
          $(".save-parent-envelope-name").focus();
        },
        onShown: function (tour) {
          $(".save-parent-envelope-name").off("focus");
          $(".save-parent-envelope-expected-amount").off("focus");
          $(".save-parent-envelope-expected-time").off("focus");
          $(".save-parent-envelope-name").one("focus", function () {
            tour.prev();
          });
          $(".save-parent-envelope-expected-amount").one("focus", function () {
            tour.next();
          });
          $(".save-parent-envelope-expected-time").one("focus", function () {
            tour.goTo(14);
          });
        },
        onNext: function (tour) {
          $(".save-parent-envelope-expected-amount").off("focus");
          $(".save-parent-envelope-expected-amount").focus();
        },
        currentStep: 12
      },
      {
        title: "Expected Deposit Amount",
        element: ".save-parent-envelope-expected-amount",
        placement: "bottom",
        content: "<p>This is the amount that the envelope expects to see deposited \
                  per a given time frame.</p><p>Since rent costs $500 per month, go \
                  ahead and set this amount to $500.</p> Then hit 'tab' or click \
                  'next' to continue.",
        onPrev: function (tour) {
          $(".save-parent-envelope-balance").off("focus");
          $(".save-parent-envelope-balance").focus();
        },
        onShown: function (tour) {
          $(".save-parent-envelope-name").off("focus");
          $(".save-parent-envelope-balance").off("focus");
          $(".save-parent-envelope-expected-time").off("focus");
          $(".save-parent-envelope-name").one("focus", function () {
            tour.goTo(11);
          });
          $(".save-parent-envelope-balance").one("focus", function () {
            tour.prev();
          });
          $(".save-parent-envelope-expected-time").one("focus", function () {
            tour.next();
          });
        },
        onNext: function (tour) {
          $(".save-parent-envelope-expected-time").off("focus");
          $(".save-parent-envelope-expected-time").focus();
        },
        currentStep: 13
      },
      {
        title: "Expected Time Frame",
        element: ".save-parent-envelope-expected-time",
        placement: "left",
        content: "<p>This is the time frame for which the envelope will need a particular \
                  amount. Let's keep this at one month since it only gets paid out once \
                  per month.</p> Then hit 'enter' or click 'Ok' to continue.",
        onPrev: function (tour) {
          $(".save-parent-envelope-expected-amount").off("focus");
          $(".save-parent-envelope-expected-amount").focus();
        },
        onShown: function (tour) {
          disableNextButton();
          $(".save-parent-envelope-name").off("focus");
          $(".save-parent-envelope-expected-balance").off("focus");
          $(".save-parent-envelope-expected-amount").off("focus");
          $(".save-parent-envelope-name").one("focus", function () {
            tour.goTo(11);
          });
          $(".save-parent-envelope-balance").one("focus", function () {
            tour.goTo(12);
          });
          $(".save-parent-envelope-expected-amount").one("focus", function () {
            tour.prev();
          });
          $("#submit-parent-envelope").one("click", function () {
            tour.next();
          });
        },
        next: 17,
        currentStep: 14
      },
      {
        title: "Navigate Back To Details",
        element: "a[href='#details']",
        placement: "bottom",
        content: "<p>We need to get back to the details tab in order to continue \
                  the tour.</p> Click on the 'Details' tab to continue.",
        reflex: true,
        prev: 16,
        onPrev: function (tour) {
          $("a[href='#details']").trigger("click");
        },
        onShown: function (tour) {
          disableNextButton();
        },
        currentStep: 15
      },
      delay,
      {
        title: "Create a 'Food' Envelope",
        element: "#create-new-parent-envelope-button",
        content: "<p>Now let's create another envelope to budget for all the food you're going \
                  to be eating...</p> Click the 'Create New Envelope' button to continue.",
        reflex: true,
        prev: 10,
        onPrev: function (tour) {
          $("#create-new-parent-envelope-button").trigger("click");
        },
        onShown: function (tour) {
          disableNextButton();
          $("#create-new-parent-envelope-button").one("remove", function () {
            tour.goTo(15);
          });
        },
        onHidden: function (tour) {
          $("#create-new-parent-envelope-button").off("remove");
        },
        currentStep: 17
      },
      delay,
      {
        title: "Envelope Details",
        element: "#modal-create-new-parent-envelope",
        content: "<p>Now for the 'Food' envelope, I think you can handle the details...</p> \
                  When you've finished, hit 'enter' or click 'Ok' to continue.",
        prev: 16,
        onPrev: function (tour) {
          hideModal(this.element);
        },
        onShown: function (tour) {
          disableNextButton();
          $("#submit-parent-envelope").one("click", function () {
            tour.next();
          });
        },
        next: 21,
        currentStep: 19
      },
      delay,
      {
        title: "Balance Tab",
        element: "a[href='#balance']",
        placement: "bottom",
        content: "<p>Now that we've got a couple of envelopes, let's go check out the \
                  'Balance' tab.</p> This is where we can quickly get an overview of the \
                  budget. Go ahead and click on it.",
        reflex: true,
        prev: 18,
        onPrev: function (tour) {
          $("#create-new-parent-envelope-button").trigger("click");
        },
        onShown: function (tour) {
          disableNextButton();
        },
        currentStep: 21
      },
      delay,
      {
        title: "Make Food Withdrawal",
        element: ".icon-minus-sign:eq(1)",
        content: "<p>These are the buttons for envelopes displayed on the 'Balance' tab. \
                  The green button is for adding money to an envelope, and the red \
                  button is for making withdrawals.</p><p>Let's pretend we went to the store \
                  and bought some groceries...</p> Click on the 'Food' withdrawal button.",
        reflex: true,
        prev: 20,
        onPrev: function (tour) {
          $("a[href='#details']").trigger("click");
        },
        onShown: function (tour) {
          disableNextButton();
        },
        currentStep: 23
      },
      delay,
      {
        title: "Withdrawal Details",
        element: "#modal-make-withdrawal",
        content: "<p>The only necessary piece of information here is the amount. The \
                  rest is optional to help you keep track of transactions if you \
                  need it.</p><p>Let's say we spent $157.63 on groceries at 'Cool \
                  Foods Co.'</p> Then hit 'enter' or click 'Ok' to continue.",
        prev: 23,
        onPrev: function (tour) {
          hideModal(this.element);
        },
        onShown: function (tour) {
          disableNextButton();
          $("#make-withdrawal").one("click", function () {
            tour.next();
          });
        },
        currentStep: 25
      },
      {
        title: "New Amount",
        element: "#balance-tab-envelope-list .thumbnail:eq(1)",
        content: "<p>You can see that the envelope now reflects the withdrawal.</p> Click \
                  'next' to continue.",
        prev: 24,
        onPrev: function (tour) {
          $(".icon-minus-sign:eq(1)").trigger("click");
        },
        next: 28,
        currentStep: 26
      },
      delay,
      {
        title: "Navigate Back To Details",
        element: "a[href='#details']",
        placement: "bottom",
        content: "<p>Now let's say that we want to add an envelope called 'Junk Food' \
                  to the 'Food' envelope to have a kind of sub-budget for junk food. \
                  To add sub-envelopes, we need to go back to the 'Details' tab.</p> Click \
                  on the 'Details' to continue.",
        reflex: true,
        prev: 26,
        onShown: function (tour) {
          disableNextButton();
        },
        currentStep: 28
      },
      delay,
      {
        title: "Add a Junk Food Sub Envelope",
        element: ".envelope-add-sub-button:eq(1)",
        content: "This orange button is used for adding sub-envelopes. Go ahead \
                  and click on it to add a sub-envelope to the 'Food' envelope.",
        reflex: true,
        prev: 27,
        onPrev: function (tour) {
          $("a[href='balance']").trigger("click");
        },
        onShown: function (tour) {
          disableNextButton();
        },
        currentStep: 30
      },
      delay,
      {
        title: "Sub Envelope Details",
        element: "#modal-create-sub-envelope",
        content: "<p>Sub-envelope details are the same as for regular envelopes except \
                  that the sub-envelope will exist inside of its \"parent\" envelope.</p> \
                  <p>Let's call this envelope 'Junk Food' and give it $50 / month.</p> Enter \
                  in the information and hit 'enter' or click 'Ok' to continue.",
        prev: 30,
        onPrev: function (tour) {
          hideModal(this.element);
        },
        onShown: function (tour) {
          disableNextButton();
          $("#submit-sub-envelope").one("click", function () {
            tour.next();
          });
        },
        currentStep: 32
      },
      {
        title: "Summary",
        element: "#details-tab-envelope-list .thumbnail:eq(1)",
        content: "<p>Now the 'Food' sub-envelopes are shown below it.</p><p>You can toggle \
                  the visibility of sub-envelopes by clicking on the 'arrow' button. \
                  Also, note that clicking the 'x' button will delete that envelope and \
                  all of its sub-envelopes.</p> Click 'next' to continue.",
        currentStep: 33
      },
      {
        title: "Edit Food Envelope",
        element: ".icon-pencil:eq(1)",
        content: "<p>Now let's edit the 'Food' envelope, since now $50 of it is going \
                  towards junk food.</p><p> To edit a particular envelope's details, click \
                  on the pencil icon for that envelope.</p> Click on the edit button for \
                  the 'Food' envelope.",
        onShown: function (tour) {
          disableNextButton();
          $(".icon-pencil:eq(1)").one("click", function () {
            tour.next();
          });
        },
        currentStep: 34
      },
      delay,
      {
        title: "Edit Envelope Details",
        element: "#modal-edit-envelope",
        content: "<p>Reduce the expected deposit amount each month by $50.</p> Then hit \
                  'enter' or click 'Ok' to continue.",
        prev: 34,
        onPrev: function (tour) {
          hideModal(this.element);
        },
        onShown: function (tour) {
          disableNextButton();
          $("#submit-edits").one("click", function () {
            tour.next();
          });
        },
        next: 38,
        currentStep: 36
      },
      delay,
      {
        title: "Navigate Back To Balance",
        element: "a[href='#balance']",
        placement: "bottom",
        content: "<p>Looking good! Let's head back to the balance tab. There's one more \
                  thing there that you'll want to know about.</p> Click the 'Balance' tab \
                  to continue.",
        reflex: true,
        prev: 35,
        onPrev: function (tour) {
          $(".icon-pencil:eq(1)").trigger("click");
        },
        onShown: function (tour) {
          disableNextButton();
        },
        currentStep: 38
      },
      delay,
      {
        title: "Parse Receipt",
        element: "#parse-receipt-button",
        content: "<p>Now let's say we buy food and junk food in the same transaction. \
                  We can handle both envelope withdrawals in the same go by using \
                  the 'Parse Receipt' button.</p> Go ahead and click on it to see what \
                  I mean.",
        reflex: true,
        prev: 37,
        onPrev: function (tour) {
          $("a[href='#details']").trigger("click");
        },
        onShown: function (tour) {
          disableNextButton();
        },
        currentStep: 40
      },
      delay,
      {
        title: "Parse Receipt",
        element: "#modal-parse-receipt",
        content: "<p>For envelope 1, select the food envelope, and for envelope 2, select \
                  the Junk food envelope.</p><p> Now try adding some amounts to each item list \
                  for each envelope. Observe how the totals are updated as you go. This way \
                  you can verify that your inputs and your receipt match.</p><p> Also, if you have \
                  any taxed items on the receipt, you can check the box to indicate that the \
                  item is taxed and it will be taken care of for you. Just be sure that the \
                  correct tax rate is indicated at the top.</p> When you're done, submit it and \
                  see the amounts change in the envelopes.",
        prev: 40,
        onPrev: function (tour) {
          hideModal(this.element);
        },
        onShown: function (tour) {
          disableNextButton();
          $("#parse-receipt-submit").one("click", function () {
            tour.next();
          });
        },
        currentStep: 42
      },
      delay,
      {
        title: "Congrats!!!",
        content: "<p>Well, that's the basics... You should now be able to create an \
                  envelope-style budget that fits your needs.</p> Thanks for taking \
                  the tour and enjoy!",
        orphan: true,
        backdrop: true,
        prev: 41,
        onPrev: function (tour) {
          $("#parse-receipt-button").trigger("click");
        },
        onShown: function (tour) {
          $("button[data-role='next']").remove();
          $("button[data-role='pause-resume']").remove();
        },
        duration: 10000,
        onNext: function (tour) {
          tour.end();
        },
        currentStep: 44
      }
    ]
  });

  tour.init();
  tour.start();
});