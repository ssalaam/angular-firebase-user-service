# angular-firebase-user-service
Angular JS service to manage authentication and user data storage through firebase

## Current Features

* Account Creation/ Authentication via email
* Authenticate via github, facebook, twitter and, gmail
* Automatically stores user data into firebase database
* Handles errors well with callbacks
* Additional service (config) to store user data during app runtime

## Install
To install simply download
[user-service-firebase.min.js](https://github.com/ssalaam/angular-firebase-user-service/blob/master/build/user-service-firebase.min.js)
and import into your project

## Setup
 [Heres a demo](http://adeayo.me/github/user-service/)
 
 Add as a dependency  
```javascript
   angular.module('myApp', ['ssalam.user-service'])
```

Include firebase library
```javascript
   <script src="https://www.gstatic.com/firebasejs/3.7.3/firebase.js"></script>
```

Intialize firebase ([steps here]( https://firebase.google.com/docs/web/setup ) )
```javascript
  angular.module('myApp', 'ssalam.user-service'])

 .run([ function() {
                   var config = {
                   apiKey: "YOUR API KEY",
                   authDomain: YOUR DOMAIN",
                   databaseURL: "YOUR DATABASE URL"
                 };
                  
                  firebase.initializeApp(config);
    }])
```
Enable all relevant auth methods in firebase console

![](http://res.cloudinary.com/veedbeta/image/upload/v1490188832/firebasescreen_oqv4an.png)

 ## Usage
 To create new account with email and password 
```javascript
    UserService.SignUpWithEmail("SOME EMAIL","SOME PASSWORD","SOME PROFILE IMAGE", "SOME USER NAME", function (response) {

                  if (response.success) {
                                
                  } else {
                      
                      console.log(response);
                      switch(response.code) {
                                case 'auth/email-already-in-use':
                                    //This account is already registered
                                    break;
                                case 'auth/invalid-email':
                                    //Please use a valid email                             
                                    break;
                                case 'weak-password':
                                  //Please choose a stronger password                                   
                                    break;  
                                default:
                                   "Looks like an uknown error has occured"
                            }
                  }
            });
```
Firebase will save new users data under "users" object
```json
{
  "displayName" : "Ade Efunbukola",
  "email" : "adeayoolu@gmail.com",
  "photoURL" : "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/10509525_297120603803706_2687166474084629318_n.jpg?oh=12cc14a6684b1ff506d40c0e51721179&oe=5963F98A",
  "uid" : "pfb7HcLrG3arzYDRjgkBeqcpBax2"
}

```

To log in via email and password 
```javascript
   UserService.LogInWithEmail("SOME EMAIL","SOME PASSWORD", function (response) {
               
                  if (response.success) {
              
                                  
                  } else {
                      console.log(response);
                      switch(response.code) {
                                case 'auth/invalid-email':
                                    alert("Please enter a valid email");
                                    break;
                                case 'auth/user-disabled':
                                alert("Whoops looks looks like your account has been temporarily disabled");
                                    break;
                                case 'auth/user-not-found':
                                alert("Whoops looks like there is no account with this email");
                                    break;
                                case 'auth/wrong-password':
                               alert("Whoops looks like your password is incorrect");                               
                                    break;                                
                                default:
                                 alert("Looks like an unknown error has occured"); 
                             
                            }

                  }
            });
```

        

        



**License:** [GPLv2](https://github.com/owncloud/android/blob/master/LICENSE.txt)

