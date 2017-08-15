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
    //You set the param based on your MailChimp naked form embed -
    //<username>.<dc>.list-manage.com/subscribe/post?u=<u>&amp;id=<id>
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
    self.yesPleaseCookie = yesPleaseCookie;
    self.scrollToTop = scrollToTop;

    initialize();

    function initialize() {
      $cookies.myCookie = 'your first cookie';
      //get the initial cookie
      if ($cookies.get('hideWithCoach')) {
        self.showHideWelcomeMat = !self.showHideWelcomeMat;
      }
    }

    function addSubscription(mailchimp) {
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
            self.yesPleaseCookie();
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

    function noThanksCookie() {
      console.log('nothtnak');
      var expiryDate = new Date();
      //set the cookie to expire 1 month form today.
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      $cookies.put('hideWithCoach', 'true', {'expires': expiryDate.toGMTString()});
      console.log($cookies.getAll());
      self.showHideWelcomeMat = true;
      self.scrollToTop();
    }

    function yesPleaseCookie() {
      console.log('YES COOKIE!!!!');
      //set the cookie to expire 1 month form today.
      expiryDate.setMonth(expiryDate.getMonth() + 12);
      $cookies.put('myFavorite', 'oatmeal');
      $cookies.put('hideWithCoach', 'false', {'expires': expiryDate.toGMTString()});
      self.showHideWelcomeMat = true;
      self.scrollToTop();
    }

    function scrollToTop() {
      $timeout(function() {
          $window.scrollTo(0,0);
      }, 2000);
    }
  }

})();
