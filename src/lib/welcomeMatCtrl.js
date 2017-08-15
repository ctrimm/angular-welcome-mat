(function() {
  'use strict';

  angular
    .module('welcomemat')
    .controller('WelcomeMatCtrl', WelcomeMatCtrl);

  /**
   * @ngdoc controller
   * @module welcomemat
   * @name WelcomeMatCtrl
   * @description Controller for the welcome mat
   * @requires $cookies
   * @requires $resource
   * @requires $timeout
   * @requires $window
   */
  function WelcomeMatCtrl($cookies, $resource, $timeout, $window) {
    var self = this;

    // Variables
    self.actions = {
      'save': {
        method: 'jsonp'
      }
    };
    self.MailChimpSubscription = '';

    /**
     * You set the param based on your MailChimp naked form embed -
     * <username>.<dc>.list-manage.com/subscribe/post?u=<u>&amp;id=<id>
     *
     * You can get your embed URL here - 
     * https://<dc>.admin.mailchimp.com/lists/integration/embeddedcode?id=<list_id>
     */
    self.params = {
      c: 'JSON_CALLBACK',
      dc: 'us3',
      id: 'b6a0f04439',
      u: '7a6246e531811217e30a51cab',
      username: 'journeyunknown'
    };
    self.showHideWelcomeMat = true;
    self.url = '';

    // Methods
    self.addSubscription = addSubscription;
    self.noThanksCookie = noThanksCookie;
    self.scrollToTop = scrollToTop;

    initialize();

    /**
     * @name WelcomeMatCtrl#initialize
     * @description Initializes the controller
     * @param {object} mailchimp Mailchimp object from the frontend
     */
    function addSubscription(mailchimp) {
      console.log('mailchimp - ', mailchimp);
      // Create a resource for interacting with the MailChimp API
      self.url = 'https://' + self.params.username + '.' + self.params.dc + '.list-manage.com/subscribe/post-json';

      var fields = Object.keys(mailchimp);

      for(var i = 0; i < fields.length; i++) {
        self.params[fields[i]] = mailchimp[fields[i]];
      }

      self.params.c = 'JSON_CALLBACK';
      self.MailChimpSubscription = $resource(self.url, self.params, self.actions);

      // Send subscriber data to MailChimp
      self.MailChimpSubscription.save(
        function (response) {
          //successfully sent data
          mailchimp.message = '';

          // Store the result from MailChimp
          mailchimp.result = response.result;

          if (response.result === 'success') {
            // Mailchimp returned a success
            mailchimp.message = response.msg;
            //call the method below to store a cookie to not display the welcome mat
            yesPleaseCookie();
          } else if (response.result === 'error') {
            // Mailchimp returned an error
            mailchimp.message = response.msg;
          } else {
            // Mailchimp returned an unhandled case
            mailchimp.message = 'Woah! The result was not a success or an error - ' + response.msg;
          }
        },
        // Error handling - yes, this is pretty ugly. We could create our own Exception for Mailchimp
        function (error) {
          alert('MailChimp Error: ' + error);
        }
      );
    }

    /**
     * @name WelcomeMatCtrl#initialize
     * @description Initializes the controller
     */
    function initialize() {
      $cookies.myCookie = 'your first cookie';
      //get the initial cookie
      if ($cookies.get('hideWelcomeMat')) {
        self.showHideWelcomeMat = !self.showHideWelcomeMat;
      }
    }

    /**
     * @name WelcomeMatCtrl#noThanksCookie
     * @description Sets the hideWelcomeMat cookie to be true - 1 month from now & scrolls to the top of the DOM
     */
    function noThanksCookie() {
      console.log('noThanksCookie');
      var expiryDate = new Date();
      //set the cookie to expire 1 month form today.
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      $cookies.put('hideWelcomeMat', 'true', {'expires': expiryDate.toGMTString()});
      console.log($cookies.getAll());
      self.showHideWelcomeMat = true;
      self.scrollToTop();
    }

    /**
     * @name WelcomeMatCtrl#scrollToTop
     * @description Sets the hideWelcomeMat cookie to be true - 1 year from today & scrolls to the top of the DOM
     */
    function scrollToTop() {
      $timeout(function() {
          $window.scrollTo(0,0);
      }, 2000);
    }

    /**
     * Private function.
     * Sets the hideWelcomeMat cookie to be true - 1 year from today & scrolls to the top of the DOM
     */
    function yesPleaseCookie() {
      console.log('YES COOKIE!!!!');
      //set the cookie to expire 1 month form today.
      expiryDate.setMonth(expiryDate.getMonth() + 12);
      $cookies.put('myFavorite', 'oatmeal');
      $cookies.put('hideWelcomeMat', 'true', {'expires': expiryDate.toGMTString()});
      self.showHideWelcomeMat = true;
      self.scrollToTop();
    }
  }

})();
