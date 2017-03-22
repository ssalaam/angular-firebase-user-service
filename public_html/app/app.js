angular.module('myApp', ['ngMaterial', 'jsonFormatter', 'ssalam.user-service'])

 .run([ function() {
        
            // Initialize Firebase
                  var config = {
                    apiKey: "AIzaSyA0KCtwuzTnfTA8ruLcNYa8tODL4_OTVwc",
                    authDomain: "userservice-e4f9d.firebaseapp.com",
                    databaseURL: "https://userservice-e4f9d.firebaseio.com",
                    storageBucket: "userservice-e4f9d.appspot.com",
                    messagingSenderId: "760004172056"
                  };
                  
                  firebase.initializeApp(config);

    }])

.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink');

});