# angular-welcome-mat
AngularJS welcome mat module

By adding this module to your AngularJS project, you can quickly implement a welcome mat of sorts.

# Easy Installation

```
Coming soon...
You'll be able to install with npm
and then simply add `welcomemat` as a dependency in your app.
```

# How to Config
1. Log into your [Mailchimp Account](https://login.mailchimp.com/)
2. Click on "Lists" in the top navigation bar
3. Click on the list that you'd like to associate the form with
4. Click "Signup Forms" on that page
5. Select "Embedded Forms"
6. Select "Naked"

In there, you should see a form action that posts to a url similar to this -
`//<username>.<dc>.list-manage.com/subscribe/post?u=<u>&amp;id=<id>`

7. Grab those params and update the `self.params` object in welcomeMatCtrl.js. *note* - these params must be set & passed into
8. On your frontend, you'll need to have a form associated with the user trying to signup for your email list.

```
<form name="SubscribeForm">
  <div ng-hide="mailchimp.result === 'success'">
    <input type="text" name="fname" ng-model="mailchimp.FNAME" placeholder="First name" required>
    <input type="text" name="lname" ng-model="mailchimp.LNAME" placeholder="Last name" required>
    <input type="text" name="email" ng-model="mailchimp.EMAIL" placeholder="Email address" required>
    <button class="button" ng-disabled="SubscribeForm.$invalid" ng-click="yourCtrl.addSubscription(mailchimp)">Join Email List</button>
  </div>
  <span class="nothanks" ng-click="yourCtrl.noThanksCookie()">
    no thanks, i'd rather not
  </span>
  <div class="message" ng-show="mailchimp.result === 'error'">
    <span ng-bind-html="mailchimp.message"></span>
  </div>
</form>
```

# To-Do
There are a handful of items left to-do before this is production ready.
- Add karma unit tests for the controller
- Debug why `$cookie` is not setting/getting properly
- Tighten up some gulp build processes (minify, uglify, etc)
- Pull mailChimpSubscription up into a service so I can be reused in other controllers
