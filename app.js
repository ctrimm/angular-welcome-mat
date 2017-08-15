// AngularJS Welcome Mat
// https://github.com/ctrimm/angular-welcome-mat
// 
// Version: 1.0.0
// License: MIT

(function() {
    'use strict';

    /**
     * @ngdoc module
     * @module welcomemat
     * @name welcomemat
     */
    angular.module('welcomemat', ['ng', 'ngResource', 'ngSanitize']);

})();

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
   * @requires $resource
   */
  function WelcomeMatCtrl($resource) {
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
    self.url = '';

    // Methods
    self.addSubscription = addSubscription;

    function addSubscription(mailchimp) {
      // Create a resource for interacting with the MailChimp API
      self.url = 'https://' + self.params.username + '.' + self.params.dc + '.list-manage.com/subscribe/post-json';

      var fields = Object.keys(mailchimp);

      for(var i = 0; i < fields.length; i++) {
        console.log('params[fields[i]] - ', self.params[fields[i]], 'mailchimp[fields[i]] - ', mailchimp[fields[i]]);
        self.params[fields[i]] = mailchimp[fields[i]];
      }

      self.params.c = 'JSON_CALLBACK';

      console.log('params - ', self.params);
      console.log('actions - ', self.actions);
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
  }

})();
